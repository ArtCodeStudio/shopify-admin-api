import { ListOptions, PublishedOptions, FieldOptions, UpdatedAtOptions } from "./base";

export interface CollectionListOptions extends ListOptions, FieldOptions, PublishedOptions, UpdatedAtOptions {
    ids?: string;
    title?: string;
    product_id?: number;
    handle?: string;
    since_id?: number;
}

export interface CollectionCountOptions extends UpdatedAtOptions, PublishedOptions {
    title?: string;
    product_id?: number
}

export interface CollectionGetOptions extends FieldOptions {}