export interface DiscountApplication {

    /**
     *  The method by which the discount application value has been allocated to entitled lines.
     *
     *  Valid values:
     *   * across: The value is spread across all entitled lines.
     *   * each: The value is applied onto every entitled line.
     *   * one: The value is applied onto a single line.
     */
    allocation_method: "across" | "each" | "one";

    /**
     *  The discount code that was used to apply the discount.
     *
     *  Available only for discount code applications.
     *
     *  (only exists if type === "discount_code")
     */
    code?: string;
  
    /**
     *  The description of the discount application, as defined by the merchant or the Shopify Script.
     *  (can be null)
     *
     *  Available only for manual and script discount applications.
     *
     *  (only exists if type === "manual" || type === "script")
     */
    description?: string | null;

    /**
     *  The lines on the order, of the type defined by target_type, that the discount is allocated over.
     *
     *  Valid values:
     *   * all: The discount is allocated onto all lines.
     *   * entitled: The discount is allocated only onto lines it is entitled for.
     *   * explicit: The discount is allocated only onto explicitly selected lines.
     */
    target_selection: "all" | "entitled" | "explicit";

    /**
     *  The type of line on the order that the discount is applicable on.
     *
     *  Valid values:
     *   * line_item: The discount applies to line items.
     *   * shipping_line: The discount applies to shipping lines.
     */
    target_type: "line_item" | "shipping_line";

    /**
     *  The title of the discount application, as defined by the merchant.
     *
     *  Available only for manual discount applications.
     *
     * (only exists if type === "manual")
     */
    title?: string;

    /**
     *  The discount_applications property includes 3 types: discount_code, manual, and script.
     *
     *  All 3 types share a common structure and have some type specific attributes.
     */
    type: "discount_code" | "manual" | "script";

    /**
     *  The value of the discount application as a decimal.
     *
     *  This represents the intention of the discount application.
     *  For example, if the intent was to apply a 20% discount, then the value will be "20.0". If the intent was to apply a $15 discount, then the value will be "15.0"
     */
    value: string;

    /**
     *  The type of the value. Valid values:
     *
     *   * fixed_amount: A fixed amount discount value in the currency of the order.
     *   * percentage: A percentage discount value.
     */
    value_type: "fixed_amount" | "percentage";

}
