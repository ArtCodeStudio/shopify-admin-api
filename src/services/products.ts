import * as Options from '../options';
import { BaseService } from '../infrastructure';
import { Product, ProductUpdateCreate } from '../interfaces';

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
}

export default Products;