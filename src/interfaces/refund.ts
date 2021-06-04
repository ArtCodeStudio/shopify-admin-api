import { ShopifyObject } from "./base";
import { Transaction } from "./transaction";
import { LineItem } from './line_item';
import { PriceSet } from './price_set';

export interface Refund extends ShopifyObject {
    admin_graphql_api_id: string;
    /**
     *  The date and time (ISO 8601 format) when the refund was created.
     */
    created_at: string;
    /**
     *  The unique identifier for the refund.
     */
    id: number;
    /**
     *  An optional note attached to a refund.
     */
    note: string | null;
    /**
     *  A list of order adjustments attached to the refund.
     */
    order_adjustments: OrderAdjustment[];
    /**
     *  The unique identifier for the order the refund belongs to.
     */
    order_id: number;
    /**
     *  The date and time (ISO 8601 format) when the refund was imported. This value can be set to a date in the past when importing from other systems. If no value is provided, then it will be auto-generated as the current time in Shopify.
     */
    processed_at: string;
    /**
     *  A list of refunded line items.
     */
    refund_line_items: RefundLineItem[];
    /**
     *  Whether to add the line items back to the store's inventory.
     *  DEPRECATED: Provide a restock_type (on individual `refund_line_item` objects) to influence how this refund affects inventory instead.
     */
    restock: boolean;
    /**
     *  A list of transactions involved in the refund. For more information, see the Transaction resource.
     */
    transactions: Transaction[];
    /**
     *  The unique identifier of the user who performed the refund.
     */
    user_id: number | null;
}

export interface RefundLineItem {
    /**
     *  The unique identifier of the line item in the refund.
     */
    id: number;
    /**
     *  The ID of the related line item in the order.
     */
    line_item_id: number;
    /**
     *  The related line item in the order (exactly identical)
     */
    line_item: LineItem;
    /**
     *  The unique identifier of the location where the items will be restocked.
     *  Required when restock_type has the value return or cancel.
     */
    location_id: number;
    /**
     *  The quantity of the associated line item that was returned.
     */
    quantity: number;
    /**
     *  How this refund line item affects inventory levels. Valid values:
     *   * no_restock: Refunding these items won't affect inventory. The number of fulfillable units for this line item will remain unchanged. For example, a refund payment can be issued but no items will be returned or made available for sale again.
     *   * cancel: The items have not yet been fulfilled. The canceled quantity will be added back to the available count. The number of fulfillable units for this line item will decrease.
     *   * return: The items were already delivered, and will be returned to the merchant. The returned quantity will be added back to the available count. The number of fulfillable units for this line item will remain unchanged.
     *   * legacy_restock: The deprecated restock property was used for this refund. These items were made available for sale again. This value is not accepted when creating new refunds.
     */
    restock_type: string;
    /**
     *  The subtotal of the refund line item
     *  Attention: This field has type 'number', whereas most other money values have type 'string'
     */
    subtotal: number;
    /**
     *  The subtotal of the refund line item, in shop and presentment currencies
     *  (BETA)
     */
    subtotal_set: PriceSet;
    /**
     *  The total tax on the refund line item.
     */
    total_tax: number;
    /**
     *  The total tax on the refund line item, in shop and presentment currencies
     *  (BETA)
     */
    total_tax_set: PriceSet;
};

export interface OrderAdjustment extends ShopifyObject {
    /**
     * The value of the discrepancy between the calculated refund and the actual refund.
     * If the kind property's value is shipping_refund, then amount returns the value of shipping charges refunded to the customer.
     */
    amount: string;
    /**
     * The amount of the order adjustment in shop and presentment currencies.
     * (BETA)
     */
    amount_set: PriceSet;
    /**
     *  The unique identifier for the order adjustment.
     */
    id: number;
    /**
     *  The order adjustment type. Valid values: shipping_refund and refund_discrepancy
     */
    kind: string;
    /**
     *  The unique identifier for the order that the order adjustment is associated with.
     */
    order_id: number;
    /**
     *  The reason for the order adjustment. To set this value, include `discrepancy_reason` when you create a refund.
     */
    reason: string;
    /**
     *  The unique identifier for the refund that the order adjustment is associated with.
     */
    refund_id: number;
    /**
     *  The taxes that are added to amount, such as applicable shipping taxes added to a shipping refund.
     */
    tax_amount: string;
    /**
     *  The tax amount of the order adjustment in shop and presentment currencies.
     *  (BETA)
     */
    tax_amount_set: PriceSet;
}
