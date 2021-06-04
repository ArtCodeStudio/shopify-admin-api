import { FieldOptions, ListOptions, PublishedOptions, DateOptions } from './base';

export interface ProductVariantBaseOptions {}

export interface ProductVariantCountOptions extends ProductVariantBaseOptions {}

export interface ProductVariantListOptions extends ProductVariantBaseOptions, ListOptions, FieldOptions {

    /**
     * Return presentment prices in only certain currencies, specified by a comma-separated list of ISO 4217 currency codes.
     */
    presentment_currencies?: string;
}

export interface ProductVariantGetOptions extends FieldOptions {}