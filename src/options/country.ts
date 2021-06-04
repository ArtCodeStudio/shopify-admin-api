import { FieldOptions, ListOptions } from "./base";

export interface CountryListOptions extends FieldOptions, ListOptions {
    /**
     * A comma-separated list of country ids.
     */
    ids?: string | string[] | number[];
}
