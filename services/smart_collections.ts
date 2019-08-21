import * as Options from '../options';
import { BaseService } from '../infrastructure';
import { SmartCollection } from '../models';

export class SmartCollections extends BaseService {
    constructor(shopDomain: string, accessToken: string) {
        super(shopDomain, accessToken, "smart_collections");
    }

    /**
     * Get a count of all smart collections that contain a given product
     * @param options Options for filtering the results.
     * @see https://help.shopify.com/api/reference/smartcollection#count
     */
    public count(options?: Options.CollectionCountOptions) {
        return this.createRequest<number>("GET", "count.json", "count", options);
    }

    /**
     * Get a list of all smart collections that contain a given product
     * @param options Options for filtering the results.
     */
    public list(options?: Options.CollectionListOptions) {
        return this.createRequest<SmartCollection[]>("GET", ".json", "smart_collections", options);
    }

    /**
     * Get a single collection
     * @param id The collection's id.
     * @param options Options for filtering the results.
     */
    public get(id: number, options?: Options.CollectionGetOptions) {
        return this.createRequest<SmartCollection>("GET", `${id}.json`, "smart_collection", options);
    }

    /**
     * Create a new smart collection. 
     * @param collection The collection being created.
     * @param options Options for creating the collection.
     */
    public create(collection: Partial<SmartCollection>) {
        return this.createRequest<SmartCollection>("POST", ".json", "smart_collection", { smart_collection: collection });
    }

    /**
     * Updates an collection with the given id.
     * @param id The collection's id.
     * @param collection The updated collection.
     */
    public update(id: number, collection: Partial<SmartCollection>) {
        return this.createRequest<SmartCollection>("PUT", `${id}.json`, "smart_collection", { smart_collection: collection });
    }

    /**
     * Deletes an collection with the given id.
     * @param id The collection's id.
     */
    public delete(id: number) {
        return this.createRequest<void>("DELETE", `${id}.json`);
    }
}

export default SmartCollections;