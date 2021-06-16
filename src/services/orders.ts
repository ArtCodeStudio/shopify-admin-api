import * as Options from '../options';
import { BaseService } from '../infrastructure';
import { MetaField, MetaFieldUpdateCreate, Order, OrderCreate, Transaction } from '../interfaces';

export class Orders extends BaseService {
    constructor(shopDomain: string, accessToken: string) {
        super(shopDomain, accessToken, "orders");
    }

    /**
     * Gets a count of all of the shop's orders.
     * @param options Options for filtering the results.
     */
    public count(options?: Options.OrderCountOptions) {
        return this.createRequest<number>("GET", "count.json", "count", options);
    }

    /**
     * Gets a list of up to 250 of the shop's orders.
     * @param options Options for filtering the results.
     */
    public list(options?: Options.OrderListOptions) {
        return this.createRequest<Partial<Order>[]>("GET", ".json", "orders", options);
    }

    /**
     * Gets a list of up to 250 orders from the given customer.
     * @param customerId The customer's id.
     * @param options Options for filtering the results.
     */
    public listForCustomer(customerId: number, options?: Options.OrderListOptions) {
        return this.createRequest<Partial<Order>[]>("GET", ".json", "orders", Object.assign({ customer_id: customerId }, options));
    }

    /**
     * Gets the order with the given id.
     * @param orderId The order's id.
     * @param options Options for filtering the results.
     */
    public get(orderId: number, options?: Options.OrderGetOptions) {
        return this.createRequest<Partial<Order>>("GET", `${orderId}.json`, "order", options);
    }

    /**
     * Creates an order.
     * @param order The order being created.
     * @param options Options for creating the order.
     */
    public create(order: OrderCreate, transactions?: Transaction[], options?: Options.OrderCreateOptions) {
        return this.createRequest<Order>("POST", ".json", "order", { order: Object.assign({}, order, options, { transactions }) });
    }

    /**
     * Updates an order with the given id.
     * @param id The order's id.
     * @param order The updated order.
     */
    public update(id: number, order: Partial<OrderCreate>) {
        return this.createRequest<Order>("PUT", `${id}.json`, "order", { order });
    }

    /**
     * Deletes an order with the given id.
     * @param id The order's id.
     */
    public delete(id: number) {
        return this.createRequest<void>("DELETE", `${id}.json`);
    }

    /**
     * Closes an order with the given id.
     * @param id The order's id.
     */
    public close(id: number) {
        return this.createRequest<Order>("POST", `${id}/close.json`, "order");
    }

    /**
     * Opens an order with the given id.
     * @param id The order's id.
     */
    public open(id: number) {
        return this.createRequest<Order>("POST", `${id}/open.json`, "order");
    }

    /**
     * Cancels an order with the given id.
     * @param id The order's id.
     * @param options Options for canceling the order.
     */
    public cancel(id: number, options?: Options.OrderCancelOptions) {
        return this.createRequest<Order>("POST", `${id}/cancel.json`, 'order', options);
    }

    /**
     * Gets a list of up to 250 metafields from the given order.
     * @param id The order's id.
     * @param options Options for filtering the results.
     */
    public listMetafields(orderId: number, options?: Options.MetafieldListOptions) {
        return this.createRequest<Partial<MetaField>[]>("GET", `${orderId}/metafields.json`, 'metafields', options);
    }

    /**
     * Returns the number of metafields belonging to the given order.
     * @param id The order's id.
     */
     public countMetafields(orderId: number) {
        return this.createRequest<number>("GET", `${orderId}/metafields/count.json`, 'count');
    }

    /**
     * Gets the metafield with the given id from an order.
     * @param orderId The order's id.
     * @param id The metafield's id.
     */
    public getMetafield(orderId: number, id: number) {
        return this.createRequest<Partial<MetaField>>("GET", `${orderId}/metafields/${id}.json`, 'metafield');
    }

    /**
     * Creates a metafield for the given order.
     * @param orderId The order's id.
     * @param id The metafield's id.
     * @param metafield Options for the metafield
     */
     public createMetafield(orderId: number, metafield: Partial<MetaFieldUpdateCreate>) {
        return this.createRequest<Partial<MetaField>>("POST", `${orderId}/metafields.json`, 'metafield', { metafield });
    }

    /**
     * Updates a metafield for the given order
     * @param orderId The order's id.
     * @param id The metafield's id.
     * @param metafield Options for the metafield
     */
     public updateMetafield(orderId: number, id: number, metafield?: Partial<MetaFieldUpdateCreate>) {
        return this.createRequest<Partial<MetaField>>("PUT", `${orderId}/metafields/${id}.json`, 'metafield', { metafield });
    }

    /**
     * Deletes the metafield with the given id from an order.
     * @param orderId The order's id.
     * @param id The metafield's id.
     */
     public deleteMetafield(orderId: number, id: number) {
        return this.createRequest<undefined>("DELETE", `${orderId}/metafields/${id}.json`, 'metafield');
    }
}

export default Orders;
