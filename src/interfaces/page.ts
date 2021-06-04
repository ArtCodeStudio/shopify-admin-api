import { ShopifyObject } from "./base";
import { MetaField } from './meta_field'

/**
 * Represents a Shopify page.
 */
export interface Page extends ShopifyObject {
  /**
   * The name of the person who created the page.
   * 
   * `"author": "Lydia"`
   */
  author: string;

  /**
   * The text content of the page, complete with HTML markup.
   * 
   * `body_html": "Contact us at <a href=\&quot;mailto:contact@johns-apparel.com\&quot;>contact@johns-apparel.com</a>.`
   */
  body_html: string;

  /**
   * The date and time (ISO 8601 format) when the page was created.
   * 
   * `"created_at": "2008-07-15T20:00:00-04:00"`
   */
  created_at: string;

  /**
   * A unique, human-friendly string for the page, generated automatically from its title. In online store themes, the Liquid templating language refers to a page by its handle.
   * 
   * `handle": "contact-us"`
   */
  handle: string;

  /**
   * The unique numeric identifier for the page.
   * 
   * `"id": 131092082`
   */
  id: number;

  /**
   * Additional information attached to the Page object. It has the following properties:
   * * **key**: An identifier for the metafield. (maximum: 30 characters)
   * * **namespace**: A container for a set of metadata. Namespaces help distinguish between metadata created by different apps. (maximum: 20 characters)
   * * **value**: The information to be stored as metadata.
   * * **value_type**:  The information type that's being stored. Valid values: `string` or `integer`.
   * * **description (optional)**: Additional information about the metafield.
   * 
   * For more information on attaching metadata to Shopify resources:
   * @see https://help.shopify.com/en/api/reference/metafield
   */
  metafield: MetaField;

  /**
   * The date and time (ISO 8601 format) when the page was published. Returns `null` when the page is hidden.
   * 
   * `"published_at": "2014-07-16T20:00:00-04:00"`
   */
  published_at: string | null;

  /**
   * The ID of the shop to which the page belongs.
   * 
   * `"shop_id": 690933842`
   */
  shop_id: number;

  /**
   * The suffix of the Liquid template being used.
   * For example, if the value is `contact`, then the page is using the `page.contact.liquid` template.
   * If the value is an empty string, then the page is using the default `page.liquid` template.
   * 
   * `"template_suffix": "contact"`
   */
  template_suffix: string;

  /**
   * The page's title.
   * 
   * `"title": "Contact us"`
   */
  title: string;

  /**
   * The date and time (ISO 8601 format) when the page was last updated.
   * 
   * `"updated_at": "2008-07-16T20:00:00-04:00"`
   */
  updated_at: string;
}
