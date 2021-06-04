import * as Options from '../options';
import { BaseService } from '../infrastructure';
import { CustomCollection } from '../interfaces';

export class CustomCollections extends BaseService {
    constructor(shopDomain: string, accessToken: string) {
        super(shopDomain, accessToken, "custom_collections");
    }

    /**
     * Get a count of all custom collections that contain a given product
     * @param options Options for filtering the results.
     * @see https://help.shopify.com/api/reference/customcollection#count
     */
    public count(options?: { title?: string, product_id?: number } & Options.DateOptions & Options.PublishedOptions) {
        return this.createRequest<number>("GET", "count.json", "count", options);
    }

    /**
     * Get a list of all custom collections that contain a given product
     * @param options Options for filtering the results.
     */
    public list(options?: Options.CollectionListOptions) {
        return this.createRequest<CustomCollection[]>("GET", ".json", "custom_collections", options);
    }

    /**
     * Get a single custom collection
     * @param id The collection's id.
     * @param options Options for filtering the results.
     */
    public get(id: number, options?: Options.FieldOptions) {
        return this.createRequest<CustomCollection>("GET", `${id}.json`, "custom_collection", options);
    }

    /**
     * Creates a custom collection.
     * @param collection The collection being created.
     * @param options Options for creating the collection.
     */
    public create(collection: Partial<CustomCollection>) {
        return this.createRequest<CustomCollection>("POST", ".json", "custom_collection", { custom_collection: collection });
    }

    /**
     * Updates a custom collection with the given id.
     * @param id The collection's id.
     * @param collection The updated collection.
     */
    public update(id: number, collection: Partial<CustomCollection>) {
        return this.createRequest<CustomCollection>("PUT", `${id}.json`, "custom_collection", { custom_collection: collection });
    }

    /**
     * Deletes a custom collection with the given id.
     * @param id The collection's id.
     */
    public delete(id: number) {
        return this.createRequest<void>("DELETE", `${id}.json`);
    }
}

export default CustomCollections;