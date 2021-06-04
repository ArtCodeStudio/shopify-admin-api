import { DiscountAllocation } from "./discount_allocation";
import { PriceSet } from "./price_set";
import { TaxLine } from "./tax_line";
import { ShopifyObject } from "./base";

export interface ShippingLine extends ShopifyObject {

    /**
     * TODO: What is this?
     */
    carrier_identifier: string | null;

    /**  
     * A reference to the shipping method.
     */
    code: string;

    /**
     * not documented
     */
    delivery_category: null | any;

    /**
     * not documented
     */
    discount_allocations: DiscountAllocation[],

    /**
     * not documented
     */
    discounted_price: string,

    /**
     * The price of the shipping method after discounts in shop and presentment currencies.
     */
    discounted_price_set: PriceSet,

    /**
     * not documented
     */
    phone: string | null,
    /**  
     * The price of this shipping method.
     */
    price: string,

    /**
     * The price of the shipping method in shop and presentment currencies.
     */
    price_set: PriceSet,

    /**
     * undocumented (always null in available test data)
     */
    requested_fulfillment_service_id: null | any;

    /**  
     * The source of the shipping method.
     */
    source: string;

    /**  
     * The title of the shipping method.
     */
    title: string;

    /**  
     * A list of <see cref="ShopifyTaxLine"/> objects, each of which details the taxes applicable to this <see cref="ShopifyShippingLine"/>.
     */
    tax_lines: TaxLine[];
}