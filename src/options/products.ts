import { FieldOptions, ListOptions, PublishedOptions, DateOptions } from './base';

export interface ProductBaseOptions {

    /**
     * Filter by product vendor
     */
    vendor?: string;

    /**
     * Filter Redirects with given target
     */
    product_type?: string;

    /**
     * Filter by collection id
     */
    collection_id?: string;
}

export interface ProductCountOptions extends ProductBaseOptions, DateOptions, PublishedOptions {}

export interface ProductListOptions extends ProductBaseOptions, ListOptions, DateOptions, PublishedOptions, FieldOptions {

    /**
     * A comma-separated list of product ids
     */
    ids?: string;

    /**
     * Filter results by product title.
     * Please note: You can also search for a substring of titles (Case insensitivity)
     */
    title?: string;

    /**
     * Filter results by product vendor.
     */
    vendor?: string;

    /**
     * Filter results by product handle.
     */
    handle?: string;

    /**
     * Filter results by product type.
     */
    product_type?: string;

    /**
     * Filter results by product collection ID.
     */
    collection_id?: string;
}

export interface ProductGetOptions extends FieldOptions {}