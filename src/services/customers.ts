import * as Options from '../options';
import { BaseService } from '../infrastructure';
import {Customer, CustomerInvite, MetaField, MetaFieldUpdateCreate } from '../interfaces';

export class Customers extends BaseService {
    constructor(shopDomain: string, accessToken: string) {
        super(shopDomain, accessToken, "customers");
    }

    /**
     * Get a count of all customers
     */
    public count() {
        return this.createRequest<number>("GET", "count.json", "count");
    }

    /**
     * Get a list of all customers
     * @param options Options for filtering the results.
     */
    public list(options?: Options.DateOptions & Options.FieldOptions & Options.ListOptions) {
        return this.createRequest<Customer[]>("GET", ".json", "customers", options);
    }

    /**
     * Searches for customers that match a supplied query.
     * @param options Options for searching customers
     */
    public search(options?: Options.CustomerSearchOptions & Options.FieldOptions & Options.BasicListOptions) {
        return this.createRequest<Customer[]>("GET", "search.json", "customers", options);
    }

    /**
     * Get a single customer
     * @param id The customer's id.
     * @param options Options for filtering the results.
     */
    public get(id: number, options?: Options.FieldOptions) {
        return this.createRequest<Customer>("GET", `${id}.json`, "customer", options);
    }

    /**
     * Creates a customer.
     * @param customer The customer being created.
     * @param options Options for creating the customer.
     */
    public create(customer: Partial<Customer>) {
        return this.createRequest<Customer>("POST", ".json", "customer", { customer: customer });
    }

    /**
     * Updates a customer with the given id.
     * @param id The customer's id.
     * @param customer The updated customer.
     */
    public update(id: number, customer: Partial<Customer>) {
        return this.createRequest<Customer>("PUT", `${id}.json`, "customer", { customer: customer });
    }

    /**
     * Deletes a customer with the given id.
     * @param id The customer's id.
     */
    public delete(id: number) {
        return this.createRequest<void>("DELETE", `${id}.json`);
    }

    /**
     * Generate an account activation URL for a customer whose account is not yet enabled
     * @param id The customer's ids
     */
    public createActivationUrl(id: number) {
        return this.createRequest<string>("POST", `${id}/account_activation_url.json`, "account_activation_url");
    }

    /**
     * Sends an account invite to a customer.
     * @param invite Optional invitation to send
     */
    public invite(invite?: CustomerInvite) {
        return this.createRequest<CustomerInvite>("POST", "send_invite.json", "customer_invite", { customer_invite: invite })
    }

    /**
     * Gets a list of up to 250 metafields from the given customer.
     * @param id The customer's id.
     * @param options Options for filtering the results.
     */
     public listMetafields(customerId: number, options?: Options.MetafieldListOptions) {
        return this.createRequest<Partial<MetaField>[]>("GET", `${customerId}/metafields.json`, 'metafields', options);
    }

    /**
     * Returns the number of metafields belonging to the given customer.
     * @param id The customer's id.
     */
     public countMetafields(customerId: number) {
        return this.createRequest<number>("GET", `${customerId}/metafields/count.json`, 'count');
    }

    /**
     * Gets the metafield with the given id from an customer.
     * @param customerId The customer's id.
     * @param id The metafield's id.
     */
    public getMetafield(customerId: number, id: number) {
        return this.createRequest<Partial<MetaField>>("GET", `${customerId}/metafields/${id}.json`, 'metafield');
    }

    /**
     * Creates a metafield for the given customer.
     * @param customerId The customer's id.
     * @param id The metafield's id.
     * @param metafield Options for the metafield
     */
     public createMetafield(customerId: number, metafield: Partial<MetaFieldUpdateCreate>) {
        return this.createRequest<Partial<MetaField>>("POST", `${customerId}/metafields.json`, 'metafield', { metafield });
    }

    /**
     * Updates a metafield for the given customer
     * @param customerId The customer's id.
     * @param id The metafield's id.
     * @param metafield Options for the metafield
     */
     public updateMetafield(customerId: number, id: number, metafield?: Partial<MetaFieldUpdateCreate>) {
        return this.createRequest<Partial<MetaField>>("PUT", `${customerId}/metafields/${id}.json`, 'metafield', { metafield });
    }

    /**
     * Deletes the metafield with the given id from an customer.
     * @param customerId The customer's id.
     * @param id The metafield's id.
     */
     public deleteMetafield(customerId: number, id: number) {
        return this.createRequest<undefined>("DELETE", `${customerId}/metafields/${id}.json`, 'metafield');
    }
}

export default Customers;
