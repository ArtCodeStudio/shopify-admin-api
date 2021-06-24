import joinPaths from 'url-join';
import fetch, { Response } from 'node-fetch';
import ShopifyError from './shopify_error';
import uri from 'jsuri';
// TODO use https://www.npmjs.com/package/bottleneck
// used on https://github.com/dcworldwide/Shopify-Prime/blob/master/infrastructure/base_service.ts?
import PQueue from 'p-queue';

export interface CallLimits {
  timestamp: number;
  remaining: number;
  current: number;
  max: number;
  retryAfter: number | null;
}

class ApiInfo {
  accessToken: string;
  requestQueue: PQueue;
  constructor(accessToken: string) {
    this.accessToken = accessToken;
    // A concurrency of 1 guarantees that responses come in the same order as requested.
    this.requestQueue = new PQueue({ concurrency: 1 });
  }

  /**
   * As a reasonable default, assume the bucket is half full and the limit is 40.
   * This is updated after the first response from Shopify.
   */
  private _callLimits: CallLimits = {
    timestamp: Date.now(),
    remaining: 20,
    current: 20,
    max: 40,
    retryAfter: null,
  };

  /**
   * Sets the call-limits from the last Shopify response header x-shopify-shop-api-call-limit'.
   * This is a string of the form `${current}/${max}`, indicating how full the "leaky bucket" of requests already is.
   * In case of a 429 (too many requests) error, Shopify may additionally provide a 'retry-after' header, indicating
   * the number of seconds when the request should be retried.
   * This is all taken into account for timing the next API call.
   * 
   * @param val string
   * @param timestamp number | null
   * @param retryAfter number | null
   * @returns CallLimits
   * 
   * TODO: Certain endpoints have limits that differ from the normal bucket size. For example, order.create is limited
   * to 5 per minute for development stores. These individual limits should be added to the individual API service
   * classes where they apply.
   */
  setCallLimits(limits: string, retryAfter: string | null = null, timestamp: null | number = null): CallLimits {
    const [current, max] = limits.split('/').map((s) => parseInt(s));
    const oldTimestamp = this._callLimits.timestamp;
    timestamp = timestamp || Date.now();
    this._callLimits.timestamp = timestamp;
    this._callLimits.remaining = max - current;
    this._callLimits.max = max;
    this._callLimits.current = current;
    this._callLimits.retryAfter = retryAfter && parseFloat(retryAfter) || this._callLimits.retryAfter && Math.max(0, (this._callLimits.retryAfter - timestamp + oldTimestamp)/1000);
    return this._callLimits;
  }

  /**
   * Gets the current call limits, calculated from the last response by Shopify and the time passed since then.
   * Optional parameter `increaseCurrent` increments the stored bucket fill state pre-emptively. This is done before making a request,
   * so that the limit is already updated to the higher fill state before a response comes back.
   *
   * @param increaseCurrent number
   * @returns CallLimits
   */
  getCallLimits(increaseCurrent: number = 0): CallLimits {
    const now = Date.now();
    const limits = { ...this._callLimits };
    const secondsPassed = (now - limits.timestamp) / 1000;
    limits.current = Math.max(0, increaseCurrent + limits.current - 2 * secondsPassed);
    limits.remaining = limits.max - limits.current;
    limits.timestamp = now;
    if (limits.retryAfter) {
      limits.retryAfter = Math.max(0, limits.retryAfter - secondsPassed);
    }
    // If we increase the current fill state, we must update the base for our calculations.
    if (increaseCurrent) {
      this._callLimits = { ...limits };
    }
    return limits;
  }
}

export class BaseService {
  private static _apiInfo: { [key: string]: ApiInfo } = {};
  public apiInfo = BaseService._apiInfo;

  constructor(
    private shopDomain: string,
    private accessToken: string,
    private resource: string,
  ) {
    //Ensure resource starts with admin/
    if (!/^[\/]?admin\//gi.test(resource)) {
      this.resource = 'admin/api/2021-07/' + resource;
    }
    if (
      !this.apiInfo[shopDomain] ||
      this.apiInfo[shopDomain].accessToken !== accessToken
    ) {
      this.apiInfo[shopDomain] = new ApiInfo(accessToken);
    }
  }

  public getCallLimits(increaseCurrent: number = 0): CallLimits {
    return this.apiInfo[this.shopDomain].getCallLimits(increaseCurrent);
  }

  public static buildDefaultHeaders() {
    const headers = {
      Accept: 'application/json',
      'User-Agent': `Shopify Admin API (https://github.com/ArtCodeStudio/shopify-admin-api)`,
    };

    return headers;
  }

  /**
   * Joins URI paths into one single string, replacing bad slashes and ensuring the path doesn't end in /.json.
   */
  protected joinUriPaths(...paths: string[]): string {
    return joinPaths(...paths).replace(/\/\.json/gi, '.json');
  }

  protected async createRequest<T>(method: 'DELETE', path: string, rootElement?: string, payload?: any): Promise<undefined>;
  protected async createRequest<T>(method: 'GET' | 'POST' | 'PUT', path: string, rootElement?: string, payload?: any): Promise<T>;

  protected async createRequest<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    path: string,
    rootElement?: string,
    payload?: any,
  ) {
    method = method.toUpperCase() as 'GET' | 'POST' | 'PUT' | 'DELETE';

    const options = {
      headers: BaseService.buildDefaultHeaders(),
      method: method,
      body: undefined as string | undefined,
    };

    if (this.accessToken) {
      options.headers['X-Shopify-Access-Token'] = this.accessToken;
    }

    const url = new uri(this.shopDomain);
    url.protocol('https');
    url.path(this.joinUriPaths(this.resource, path));

    if ((method === 'GET' || method === 'DELETE') && payload) {
      for (const prop in payload) {
        const value = payload[prop];

        // Shopify expects qs array values to be joined by a comma, e.g. fields=field1,field2,field3
        url.addQueryParam(prop, Array.isArray(value) ? value.join(',') : value);
      }
    } else if (payload) {
      options.body = JSON.stringify(payload);

      options.headers['Content-Type'] = 'application/json';
    }

    // Fetch will only throw an exception when there is a network-related error, not when Shopify returns a non-200 response.
    // We re-queue the request while there are 429 errors (too many requests / rate limit exceeded)

    /**
     *  Queue requests and keep the call limit in check.
     *
     *  NOTE: this method is provisory. There are two problems with it:
     *
     *  1. the queue can become arbitrary large, with longer and longer wait times and
     *  eventually memory problems, if an app just keeps on adding request after request.
     *
     *  2. There is still no guarantee that a `too many requests` (code 429) will not happen if a big number of requests is added at once.
     */
    let result = await BaseService._apiInfo[this.shopDomain].requestQueue.add(
      async () => {
        do {
          // Check that we don't hit call limit
          let { remaining, retryAfter } = this.getCallLimits();

          while (remaining < 5 || retryAfter && retryAfter > 0) {
            ({ remaining, retryAfter } = this.getCallLimits());
            await new Promise((res) => setTimeout(res, Math.max((5 - remaining) * 500), (retryAfter || 0) * 1000));
          }

          let res = await fetch(url.toString(), options);
          const headerCallLimits = res.headers.get('x-shopify-shop-api-call-limit');
          const headerRetryAfter = res.headers.get('retry-after');

          if (headerCallLimits) {
            this.apiInfo[this.shopDomain].setCallLimits(headerCallLimits, headerRetryAfter);
          }

          // Continue the loop while we get 429 errors
          if (res.status === 429) {
            continue;
          }
          return res;
        } while (true);
      }
    );

    // Shopify implement 204 - no content for DELETE requests
    if (method === 'DELETE' && result.status === 204) {
      return;
    }

    let json = (await result.text()) as any;

    try {
      json = JSON.parse(json);
    } catch (e) {
      throw new ShopifyError(result, json);
    }

    if (!result.ok) {
      throw new ShopifyError(result, json);
    }

    return rootElement ? (json[rootElement] as T) : (json as T);
  }
}

export default BaseService;
