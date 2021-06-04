import * as Options from '../options';
import { BaseService } from '../infrastructure';
import { Page } from '../interfaces';

/**
 * A service for manipulating Shopify pages.
 */
export class Pages extends BaseService {
    constructor(shopDomain: string, accessToken: string) {
        super(shopDomain, accessToken, "pages");
    }

    /**
     * Creates a new page.
     * @param page The page being created.
     */
    public create(page: Partial<Page>) {
        return this.createRequest<Page>("POST", `.json`, "page", { page });
    }

    /**
     * Retrieves a single page by its ID.
     * @param id Id of the page to retrieve.
     * @param options Options for filtering the result.
     */
    public get(id: number, options?: Options.PageGetOptions) {
        return this.createRequest<Partial<Page>>("GET", `${id}.json`, "page", options);
    }

    /**
     * Updates a page with the given id.
     * @param id Id of the page being updated.
     * @param page The updated page.
     */
    public update(id: number, page: Partial<Page>) {
        return this.createRequest<Page>("PUT", `${id}.json`, "page", { page });
    }

    /**
     * Retrieve a list of all pages.
     * @param options Options for filtering the results.
     */
    public list(options?: Options.PageListOptions) {
        return this.createRequest<Partial<Page>[]>("GET", `.json`, "pages", options);
    }

    /**
     * Retrieves a page count.
     */
    public count(options?: Options.PageCountOptions) {
        return this.createRequest<number>("GET", "count.json", "count", options);
    }

    /**
     * Deletes a page with the given id.
     * @param id Id of the page being deleted.
     */
    public delete(id: number) {
        return this.createRequest<{id: number}>("DELETE", `${id}.json`);
    }
}

export default Page;