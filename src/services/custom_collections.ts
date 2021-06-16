import * as Options from '../options';
import { BaseService } from '../infrastructure';
import { CustomCollection, MetaField, MetaFieldUpdateCreate } from '../interfaces';

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

    /**
     * Gets a list of up to 250 metafields from the given customCollection.
     * @param id The customCollection's id.
     * @param options Options for filtering the results.
     */
    public listMetafields(customCollectionId: number, options?: Options.MetafieldListOptions) {
        return this.createRequest<Partial<MetaField>[]>("GET", `${customCollectionId}/metafields.json`, 'metafields', options);
    }

    /**
     * Returns the number of metafields belonging to the given customCollection.
     * @param id The customCollection's id.
     */
     public countMetafields(customCollectionId: number) {
        return this.createRequest<number>("GET", `${customCollectionId}/metafields/count.json`, 'count');
    }

    /**
     * Gets the metafield with the given id from an customCollection.
     * @param customCollectionId The customCollection's id.
     * @param id The metafield's id.
     */
    public getMetafield(customCollectionId: number, id: number) {
        return this.createRequest<Partial<MetaField>>("GET", `${customCollectionId}/metafields/${id}.json`, 'metafield');
    }

    /**
     * Creates a metafield for the given customCollection.
     * @param customCollectionId The customCollection's id.
     * @param id The metafield's id.
     * @param metafield Options for the metafield
     */
     public createMetafield(customCollectionId: number, metafield: Partial<MetaFieldUpdateCreate>) {
        return this.createRequest<Partial<MetaField>>("POST", `${customCollectionId}/metafields.json`, 'metafield', { metafield });
    }

    /**
     * Updates a metafield for the given customCollection
     * @param customCollectionId The customCollection's id.
     * @param id The metafield's id.
     * @param metafield Options for the metafield
     */
     public updateMetafield(customCollectionId: number, id: number, metafield?: Partial<MetaFieldUpdateCreate>) {
        return this.createRequest<Partial<MetaField>>("PUT", `${customCollectionId}/metafields/${id}.json`, 'metafield', { metafield });
    }

    /**
     * Deletes the metafield with the given id from an customCollection.
     * @param customCollectionId The customCollection's id.
     * @param id The metafield's id.
     */
     public deleteMetafield(customCollectionId: number, id: number) {
        return this.createRequest<undefined>("DELETE", `${customCollectionId}/metafields/${id}.json`, 'metafield');
    }
}

export default CustomCollections;