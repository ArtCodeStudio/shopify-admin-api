import * as Options from '../options';
import { BaseService } from '../infrastructure';
import { Checkout } from '../interfaces';

/**
 * A service for manipulating Shopify's Checkout API.
 * If the app is not a Sales Channel app, only the GET methods are available. PUT, and POST requests will return `422 unprocessable entity` errors.
 */
export class Checkouts extends BaseService {
    constructor(shopDomain: string, accessToken: string) {
        super(shopDomain, accessToken, "checkouts");
    }

    /**
     * Creates a new checkout.
     */
    public create(checkout: Partial<Checkout>) {
        return this.createRequest<Checkout>("POST", ".json", "checkout", { checkout });
    }

    /**
     * Updates a checkout.
     */
    public update(token: string, checkout: Partial<Checkout>) {
      return this.createRequest<Checkout>("PUT", `${token}.json`, "checkout", { checkout });
    }

    /**
     * Completes a checkout.
     */
    public complete(token: string) {
        return this.createRequest<Checkout>("PUT", `${token}/complete.json`, "checkout", {});
      }

    /**
     * Gets a checkout with the given token.
     * @param token The token of the checkout to get.
     * @param options Options for filtering the result.
     */
    public get(token: string, options?: Options.CheckoutGetOptions) {
        return this.createRequest<Checkout>("GET", `${token}.json`, "checkout", options);
    }

    /**
     * Retrieves a list of up to 250 checkouts.
     * @param options Options for pagination and filtering the result.
     */
    public list(options?: Options.CheckoutListOptions) {
        return this.createRequest<Checkout[]>("GET", ".json", "checkouts", options);
    }
}

export default Checkouts;