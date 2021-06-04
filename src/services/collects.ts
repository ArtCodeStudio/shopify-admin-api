import * as Options from '../options';
import { BaseService } from '../infrastructure';
import { Collect } from '../interfaces';

/**
 * A service for manipulating Shopify's Collect API.
 */
export class Collects extends BaseService {
    constructor(shopDomain: string, accessToken: string) {
        super(shopDomain, accessToken, "collects");
    }

    /**
     * Creates a new collect object, connecting a product to a custom collection.
     */
    public create(collect: Partial<Collect>) {
        return this.createRequest<Collect>("POST", ".json", "collect", { collect });
    }

    /**
     * Gets a count of collects
     * @param id The id of the collect to get.
     * @param options Options for filtering the result.
     */
    public count(options?: Options.CollectCountOptions) {
      return this.createRequest<number>("GET", "count.json", "count", options);
    }

    /**
     * Gets a collect with the given id.
     * @param id The id of the collect to get.
     * @param options Options for filtering the result.
     */
    public get(id: number, options?: Options.CollectGetOptions) {
        return this.createRequest<Collect>("GET", `${id}.json`, "collect", options);
    }

    /**
     * Retrieves a list of up to 250 collects.
     * @param options Options for pagination and filtering the result.
     */
    public list(options?: Options.CollectListOptions) {
        return this.createRequest<Collect[]>("GET", ".json", "collects", options);
    }
}

export default Collects;