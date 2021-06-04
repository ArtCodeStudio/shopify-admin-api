import { ShopifyObject } from "./base";

export interface Province extends ShopifyObject {
    code: string;
    country_id: number;
    name: string;
    tax: number;
    tax_name: string;
    tax_type: string;
    tax_percentage: number;
}

export interface Country extends ShopifyObject {
    code?: string;
    name?: string;
    tax?: number;
    provinces?: Province[]
}