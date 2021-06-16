import * as Options from '../options';
import { BaseService } from '../infrastructure';
import { SmartCollection, MetaField, MetaFieldUpdateCreate } from '../interfaces';

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

    /**
     * Gets a list of up to 250 metafields from the given smartCollection.
     * @param id The smartCollection's id.
     * @param options Options for filtering the results.
     */
    public listMetafields(smartCollectionId: number, options?: Options.MetafieldListOptions) {
        return this.createRequest<Partial<MetaField>[]>("GET", `${smartCollectionId}/metafields.json`, 'metafields', options);
    }

    /**
     * Returns the number of metafields belonging to the given smartCollection.
     * @param id The smartCollection's id.
     */
     public countMetafields(smartCollectionId: number) {
        return this.createRequest<number>("GET", `${smartCollectionId}/metafields/count.json`, 'count');
    }

    /**
     * Gets the metafield with the given id from an smartCollection.
     * @param smartCollectionId The smartCollection's id.
     * @param id The metafield's id.
     */
    public getMetafield(smartCollectionId: number, id: number) {
        return this.createRequest<Partial<MetaField>>("GET", `${smartCollectionId}/metafields/${id}.json`, 'metafield');
    }

    /**
     * Creates a metafield for the given smartCollection.
     * @param smartCollectionId The smartCollection's id.
     * @param id The metafield's id.
     * @param metafield Options for the metafield
     */
     public createMetafield(smartCollectionId: number, metafield: Partial<MetaFieldUpdateCreate>) {
        return this.createRequest<Partial<MetaField>>("POST", `${smartCollectionId}/metafields.json`, 'metafield', { metafield });
    }

    /**
     * Updates a metafield for the given smartCollection
     * @param smartCollectionId The smartCollection's id.
     * @param id The metafield's id.
     * @param metafield Options for the metafield
     */
     public updateMetafield(smartCollectionId: number, id: number, metafield?: Partial<MetaFieldUpdateCreate>) {
        return this.createRequest<Partial<MetaField>>("PUT", `${smartCollectionId}/metafields/${id}.json`, 'metafield', { metafield });
    }

    /**
     * Deletes the metafield with the given id from an smartCollection.
     * @param smartCollectionId The smartCollection's id.
     * @param id The metafield's id.
     */
     public deleteMetafield(smartCollectionId: number, id: number) {
        return this.createRequest<undefined>("DELETE", `${smartCollectionId}/metafields/${id}.json`, 'metafield');
    }
}

export default SmartCollections;