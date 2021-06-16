import * as Options from '../options';
import { BaseService } from '../infrastructure';
import { Page, MetaField, MetaFieldUpdateCreate } from '../interfaces';

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

    /**
     * Gets a list of up to 250 metafields from the given page.
     * @param id The page's id.
     * @param options Options for filtering the results.
     */
     public listMetafields(pageId: number, options?: Options.MetafieldListOptions) {
        return this.createRequest<Partial<MetaField>[]>("GET", `${pageId}/metafields.json`, 'metafields', options);
    }

    /**
     * Returns the number of metafields belonging to the given page.
     * @param id The page's id.
     */
     public countMetafields(pageId: number) {
        return this.createRequest<number>("GET", `${pageId}/metafields/count.json`, 'count');
    }

    /**
     * Gets the metafield with the given id from an page.
     * @param pageId The page's id.
     * @param id The metafield's id.
     */
    public getMetafield(pageId: number, id: number) {
        return this.createRequest<Partial<MetaField>>("GET", `${pageId}/metafields/${id}.json`, 'metafield');
    }

    /**
     * Creates a metafield for the given page.
     * @param pageId The page's id.
     * @param id The metafield's id.
     * @param metafield Options for the metafield
     */
     public createMetafield(pageId: number, metafield: Partial<MetaFieldUpdateCreate>) {
        return this.createRequest<Partial<MetaField>>("POST", `${pageId}/metafields.json`, 'metafield', { metafield });
    }

    /**
     * Updates a metafield for the given page
     * @param pageId The page's id.
     * @param id The metafield's id.
     * @param metafield Options for the metafield
     */
     public updateMetafield(pageId: number, id: number, metafield?: Partial<MetaFieldUpdateCreate>) {
        return this.createRequest<Partial<MetaField>>("PUT", `${pageId}/metafields/${id}.json`, 'metafield', { metafield });
    }

    /**
     * Deletes the metafield with the given id from an page.
     * @param pageId The page's id.
     * @param id The metafield's id.
     */
     public deleteMetafield(pageId: number, id: number) {
        return this.createRequest<undefined>("DELETE", `${pageId}/metafields/${id}.json`, 'metafield');
    }
}

export default Page;