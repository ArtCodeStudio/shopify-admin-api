import { ListOptions, SinceIdOptions, FieldOptions } from "./base";

export interface CollectListOptions extends ListOptions, FieldOptions {};

export interface CollectCountOptions extends SinceIdOptions {
    // Count only collects for a certain product
    product_id?: number;
    // Count only collects for a certain collection
    collection_id?: number;
}

export interface CollectGetOptions extends FieldOptions {};