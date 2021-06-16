import * as Options from '../options';
import { BaseService } from '../infrastructure';
import { Product, ProductUpdateCreate, MetaField, MetaFieldUpdateCreate } from '../interfaces';

export class Products extends BaseService {
    constructor(shopDomain: string, accessToken: string) {
        super(shopDomain, accessToken, "products");
    }

    /**
     * Gets a count of all of the shop's Products.
     * @param options Options for filtering the results.
     * @see https://help.shopify.com/api/reference/product#count
     */
    public count(options?: Options.ProductCountOptions) {
        return this.createRequest<number>("GET", "count.json", "count", options);
    }

    /**
     * Gets a list of up to 250 of the shop's Products.
     * @param options Options for filtering the results.
     */
    public list(options?: Options.ProductListOptions) {
        return this.createRequest<Product[]>("GET", ".json", "products", options);
    }

    /**
     * Gets the Product with the given id.
     * @param id The Product's id.
     * @param options Options for filtering the results.
     */
    public get(id: number, options?: Options.ProductGetOptions) {
        return this.createRequest<Product>("GET", `${id}.json`, "product", options);
    }

    /**
     * Creates an Product.
     * @param product The Product being created.
     * @param options Options for creating the Product.
     */
    public create(product: ProductUpdateCreate) {
        return this.createRequest<Product>("POST", ".json", "product", { product });
    }

    /**
     * Updates an Product with the given id.
     * @param id The Product's id.
     * @param product The updated Product.
     */
    public update(id: number, product: ProductUpdateCreate) {
        return this.createRequest<Product>("PUT", `${id}.json`, "product", { product });
    }

    /**
     * Deletes an Product with the given id.
     * @param id The Product's id.
     */
    public delete(id: number) {
        return this.createRequest<{id: number}>("DELETE", `${id}.json`);
    }

    /**
     * Gets a list of up to 250 metafields from the given product.
     * @param id The product's id.
     * @param options Options for filtering the results.
     */
     public listMetafields(productId: number, options?: Options.MetafieldListOptions) {
        return this.createRequest<Partial<MetaField>[]>("GET", `${productId}/metafields.json`, 'metafields', options);
    }

    /**
     * Returns the number of metafields belonging to the given product.
     * @param id The product's id.
     */
     public countMetafields(productId: number) {
        return this.createRequest<number>("GET", `${productId}/metafields/count.json`, 'count');
    }

    /**
     * Gets the metafield with the given id from an product.
     * @param productId The product's id.
     * @param id The metafield's id.
     */
    public getMetafield(productId: number, id: number) {
        return this.createRequest<Partial<MetaField>>("GET", `${productId}/metafields/${id}.json`, 'metafield');
    }

    /**
     * Creates a metafield for the given product.
     * @param productId The product's id.
     * @param id The metafield's id.
     * @param metafield Options for the metafield
     */
     public createMetafield(productId: number, metafield: Partial<MetaFieldUpdateCreate>) {
        return this.createRequest<Partial<MetaField>>("POST", `${productId}/metafields.json`, 'metafield', { metafield });
    }

    /**
     * Updates a metafield for the given product
     * @param productId The product's id.
     * @param id The metafield's id.
     * @param metafield Options for the metafield
     */
     public updateMetafield(productId: number, id: number, metafield?: Partial<MetaFieldUpdateCreate>) {
        return this.createRequest<Partial<MetaField>>("PUT", `${productId}/metafields/${id}.json`, 'metafield', { metafield });
    }

    /**
     * Deletes the metafield with the given id from an product.
     * @param productId The product's id.
     * @param id The metafield's id.
     */
     public deleteMetafield(productId: number, id: number) {
        return this.createRequest<undefined>("DELETE", `${productId}/metafields/${id}.json`, 'metafield');
    }
}

export default Products;