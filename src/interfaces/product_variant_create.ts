import { ShopifyObject } from './base';

import { ProductVariant } from './product_variant';

/**
 * A list of product variant objects, each one representing a slightly different version of the product. 
 * For example, if a product comes in different sizes and colors, each size and color permutation 
 * (such as "small black", "medium black", "large blue"), would be a variant.
 * 
 * To reorder variants, update the product with the variants in the desired order. The position
 * attribute on the variant will be ignored.
 * 
 */
export interface ProductVariantCreate extends Partial<ProductVariant>, Partial<ShopifyObject> {
    /**
     * Custom properties that a shop owner can use to define product variants. Multiple options can exist. Options are represented as: option1, option2, option3 etc.
     */
    option1: string;
}
