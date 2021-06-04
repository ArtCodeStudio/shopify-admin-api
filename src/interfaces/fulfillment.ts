import { ShopifyObject } from "./base";
import { LineItem } from "./line_item";

export interface Fulfillment extends ShopifyObject {
    /**
     * The ID for the fulfillment
     */
    id: number;

    /**
     * The date and time when the fulfillment was created. 
     */
    created_at: string;

    /**
     * A historical record of each item in the fulfillment.
     */
    line_items: LineItem[];

    /**
     * The unique identifier of the location that the fulfillment should be processed for. In order to find the ID of the location, use the Location API.
     */
    location_id: number;

    /**
     * The uniquely identifying fulfillment name, consisting of two parts separated by a '.'. The first part represents the order name and the second part represents the fulfillment number. The fulfillment number automatically increments depending on how many fulfillments are in an order (e.g. #1001.1, #1001.2). 
     */
    name: string;

    /**
     * Whether the customer should be notified. If set to true, then an email will be sent when the fulfillment is created or updated. For orders that were initially created using the API, the default value is false. For all other orders, the default value is true.
     *
     * (does not exist on any order of a production store that I tested; might be a parameter that is only passed to POST method but is not retrieved on GET)
     */
    notify_customer?: boolean;

    /**
     * The unique numeric identifier for the order.
     */
    order_id: number;

    /**
     * An arbitrary object without defined interface (the Shopify documentation is wrong)
     */
    receipt: object;

    /**
     * The type of service used.
     */
    service: string;

    /**
     * The current shipment status for the order. Valid values:
     *  * null
     *  * "confirmed"
     *  * "in_transit"
     *  * "out_of_delivery"
     *  * "delivered"
     *  * "failure"
     * 
     * (can be null)
     */
    shipment_status: null | "confirmed" | "in_transit" | "out_of_delivery" | "delivered" | "failure";

    /**
     * The status of the fulfillment. Valid values:
     */
    status: "pending" | "open" | "success" | "cancelled" | "error" | "failure";

    /**
     * The name of the tracking company.
     * 
     * (can be null)
     */
    tracking_company: null | string;

    /**
     * The shipping number, provided by the shipping company. If multiple tracking numbers
     * exist, returns the first number. If none, null.
     */
    tracking_number: string | null;

    /**
     * A list of shipping numbers, provided by the shipping company. May be empty.
     */
    tracking_numbers: string[];

    /**
     * The tracking url, provided by the shipping company. May be null. If multiple tracking URLs
     * exist, returns the first URL.
     */
    tracking_url: string | null;

    /**
     * An array of one or more tracking urls, provided by the shipping company. May be null.
     */
    tracking_urls: string[];

    /**
     * The date and time when the fulfillment was last modified.
     */
    updated_at: string;

    /**
     * The name of the inventory management service.
     *
     * (can be undefined)
     */
    variant_inventory_management?: string;
}