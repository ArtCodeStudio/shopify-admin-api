import { TaxLine } from './tax_line';
import { ShopifyObject } from './base';
import { LineItemProperty } from './line_item_property';
import { DiscountAllocation } from './discount_allocation';
import { Location } from './location';
import { PriceSet } from './price_set';

export interface LineItem extends ShopifyObject {
  /**
   * does not always exist
   */
  destination_location?: Location;

  /**
   *  An ordered list of amounts allocated by discount applications. Each discount allocation is associated to a particular discount application.
   */
  discount_allocations: DiscountAllocation[];

  /**
   *  The amount available to fulfill. This is the quantity - max(refunded_quantity, fulfilled_quantity) - pending_fulfilled_quantity.
   */
  fulfillable_quantity: number;

  /**
   *  Service provider who is doing the fulfillment. Valid values are either "manual" or the name of the provider. eg: "amazon", "shipwire", etc.
   */
  fulfillment_service: string;

  /**
   *  The fulfillment status of this line item. Known values are 'fulfilled', 'null' and 'partial'.
   */
  fulfillment_status: string;

  /**
   *  States whether the order used a gift card.
   */
  gift_card: boolean;

  /**
   *  The weight of the item in grams.
   */
  grams: number;

  /**
   *  The name of the product variant.
   */
  name: string;

  /**
   * does not always exist
   */
  origin_location?: Location;

  /**
   *  The price of the item before taxes have been applied.
   */
  pre_tax_price: string;

  /**
   *  The pre-tax price of the item in shop and presentment currencies.
   *  (BETA)
   */
  pre_tax_price_set: PriceSet;

  /**
   *  The price of the item before discounts have been applied.
   */
  price: string | number;

  /**
   * TODO: what does this mean?
   */
  product_exists: boolean;

  /**
   *  The price of the item in shop and presentment currencies.
   *  (BETA)
   */
  price_set: PriceSet;

  /**
   * The unique numeric identifier for the product in the fulfillment. Can be null if the original product associated with the order is deleted at a later date
   */
  product_id: number;

  /**
   *  An array of custom information for an item that has been added to the cart.
   *  Often used to provide product customization options.
   *  An array of <see cref="ShopifyTaxLine"/> objects, each of which details the taxes applicable to this <see cref="ShopifyLineItem"/>.
   */
  properties: LineItemProperty[];

  /**
   *  The number of products that were purchased.
   */
  quantity: number;

  /**
   *  States whether or not the fulfillment requires shipping.
   */
  requires_shipping: boolean;

  /**
   *  A unique identifier of the item in the fulfillment.
   */
  sku: string;

  /**
   *  States whether or not the product was taxable.
   */
  taxable: boolean;

  /**
   *  An array of <see cref="ShopifyTaxLine"/> objects, each of which details the taxes applicable to this <see cref="ShopifyLineItem"/>.
   */
  tax_lines: TaxLine[];

  /**
   *  The title of the product.
   */
  title: string;

  /**
   *  The total discount amount applied to this line item. This value is not subtracted in the line item price.
   */
  total_discount: string;

  /**
   *  The total discount amount applied to this line item in shop and presentment currencies.
   *  (BETA)
   */
  total_discount_set: PriceSet;

  /**
   *  The id of the product variant. Can be null if the product purchased is not a variant.
   */
  variant_id: number;

  /**
   *  TODO: What is this? (known values: "shopify", null)
   */
  variant_inventory_management: null | string;

  /**
   *  The title of the product variant. Can be null if the product purchased is not a variant.
   */
  variant_title: string;

  /**
   *  The name of the supplier of the item.
   */
  vendor: string;
}
