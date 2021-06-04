import { ShopifyObject } from "./base";
import { PriceSet } from "./price_set";

export interface TaxLine extends ShopifyObject {
    /**
     * The amount of tax to be charged.
     */
    price: string;

    /**
     * The amount of tax to be charged, in shop and presentment currencies.
     * (BETA)
     */
    price_set: PriceSet;

    /**
     * The rate of tax to be applied.
     */
    rate: number;

    /**
     * The name of the tax.
     */
    title: string;
}