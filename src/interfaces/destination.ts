export interface Destination {
    /** E.g. "Steve" */
    first_name: string;
    /** E.g. "123 Shipping Street" */
    address1: string;
    /** E.g. "555-555-SHIP" */
    phone: string;
    /** E.g. "Shippington" */
    city: string;
    /** E.g. "40003" */
    zip: string;
    /** E.g. "Kentucky" */
    province: string;
    /** E.g. "United States" */
    country: string;
    /** E.g. "Shipper" */
    last_name: string;
    /** E.g. null */
    address2: string | null,
    /** E.g. "Shipping Company" */
    company: string;
    /** E.g. null */
    latitude: null,
    /** E.g. null */
    longitude: null,
    /** E.g. "Steve Shipper" */
    name: string;
    /** E.g. "US" */
    country_code: string;
    /** E.g. "KY" */
    province_code: string;
}
