/**
 * An object representing a CarrierService
 */
export interface CarrierService {
    /**
     * The ID of the carrier service.
     */
    id: number;

    /**
     * The name of the shipping service as seen by merchants and their customers.
     */
    name: string;

    /**
     * Whether this carrier service is active.
     * default value: true
     */
    active: boolean;

    /**
     * Whether merchants are able to send dummy data to your service through the Shopify admin to see shipping rate examples.
     * default value: true
     */
    service_discovery: boolean;

    /**
     * Distinguishes between API or legacy carrier services.
     * Valid values: "api" and "legacy".
     * Default value: "api".
     */
    carrier_service_type: "api" | "legacy";

    /**
     * The format of the data returned by the URL endpoint.
     * Valid values: "json" and "xml".
     * Default value: "json".
     */
    format: "json" | "xml";

    /**
     * The URL endpoint that Shopify needs to retrieve shipping rates. This must be a public URL.
     * (this property is not returned for CarrierServices connected through a carrier account)
     */
    callback_url?: string;
}