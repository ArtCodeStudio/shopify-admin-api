import { DateOptions, FieldOptions, ListOptions } from "./base";

export interface MetafieldListOptions extends FieldOptions, DateOptions, ListOptions {
    /**
     * Shows metafields with given namespace
     */
    namespace?: string;

    /**
     * The type of the value of the listed metafields
     */
    value_type?: "string" | "integer";
}
