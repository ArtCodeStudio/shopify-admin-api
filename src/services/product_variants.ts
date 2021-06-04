import * as Options from '../options';
import { ProductVariant, ProductVariantCreate, ProductVariantUpdate } from '../interfaces';
import { BaseService } from '../infrastructure';

/**
 * A service for manipulating a blog's product variants.
 */
export class ProductVariants extends BaseService {
    constructor(shopDomain: string, accessToken: string) {
        super(shopDomain, accessToken, "");
    }

    /**
     * Gets a variant with the given id.
     * @param id Id of the variant being retrieved.
     * @param options Options for filtering the result.
     */
    public get(id: number, options?: Options.ProductVariantGetOptions) {
        return this.createRequest<ProductVariant>("GET", `variants/${id}.json`, "variant", options);
    }

    /**
     * Lists up to 250 variants for the given product.
     * @param productId Id of the product that the variants belong to.
     * @param options Options for filtering the results.
     */
    public list(productId: number, options?: Options.ProductVariantListOptions) {
        return this.createRequest<ProductVariant>("GET", `products/${productId}/variants.json`, "variants", options);
    }

    /**
     * Counts the variants on the given product.
     * @param productId Id of the product that the variants belong to.
     */
    public count(productId: number) {
        return this.createRequest<number>("GET", `products/${productId}/variants/count.json`, "count");
    }

    /**
     * Creates a new product variant 
     * @param productId Id of the product that the varaint belongs to.
     * @param productVariant The updated variant.
     */
    public create(productId: number, variant: ProductVariantCreate) {
        return this.createRequest<ProductVariant>("POST", `variants/${productId}/variants.json`, "variant", { variant });
    }

    /**
     * Updates an variant with the given id.
     * @param id Id of the variant.
     * @param productVariant The updated variant.
     */
    public update(id: number, variant: ProductVariantUpdate) {
        return this.createRequest<ProductVariant>("PUT", `variants/${id}.json`, "variant", { variant });
    }

    /**
     * Deletes the variant with the given variantId.
     * @param productId Id of the product that the varaint belongs to.
     * @param variantId Id of the variant to delete.
     */
    public delete(productId: number, variantId: number) {
        return this.createRequest<void>("DELETE", `products/${productId}/variants/${variantId}.json`);
    }
}

export default ProductVariants;
