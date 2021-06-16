import * as Options from "../options";
import { BaseService } from "../infrastructure";
import { DraftOrder, MetaField, MetaFieldUpdateCreate } from "../interfaces";

/**
 * A service for manipulating Shopify draft orders.
 */
export class DraftOrders extends BaseService {
    constructor(shopDomain: string, accessToken: string) {
        super(shopDomain, accessToken, "draft_orders");
    }

    /**
     * Creates a new draft order.
     */
    public create(order: Partial<DraftOrder>, useCustomerDefaultAddress: boolean = false) {
        const body = {
            ...order,
            use_customer_default_address: useCustomerDefaultAddress
        };

        return this.createRequest<DraftOrder>("POST", ".json", "draft_order", { draft_order: body });
    }

    /**
     * Updates the draft order with the given id.
     */
    public update(id: number, order: Partial<DraftOrder>) {
        return this.createRequest<DraftOrder>("PUT", `${id}.json`, "draft_order", { draft_order: order });
    }

    /**
     * Gets a list of up to 250 of the shop's draft orders.
     * @param options Options for filtering the results.
     */
    public list(options?: Options.ListOptions) {
        return this.createRequest<DraftOrder[]>("GET", ".json", "draft_orders", options);
    }

    /**
     * Counts the draft orders on the shop.
     */
    public count(options?: any) {
        return this.createRequest<number>("GET", "count.json", "count");
    }

    /**
     * Retrieves the draft order with the given id.
     */
    public get(id: number) {
        return this.createRequest<DraftOrder>("GET", `${id}.json`, "draft_order");
    }

    /**
     * Deletes the draft order with the given id.
     */
    public delete(id: number) {
        return this.createRequest<void>("DELETE", `${id}.json`);
    }

    /**
     * Completes the draft order, transitioning it to a full order.
     */
    public complete(id: number, paymentPending: boolean = false) {
        return this.createRequest<DraftOrder>(
            "POST",
            `${id}/complete.json?paymentPending=${paymentPending}`,
            "draft_order"
        );
    }

    // TODO: Implement DraftOrders.sendInvoice


    /**
     * Gets a list of up to 250 metafields from the given draftOrder.
     * @param id The draftOrder's id.
     * @param options Options for filtering the results.
     */
     public listMetafields(draftOrderId: number, options?: Options.MetafieldListOptions) {
        return this.createRequest<Partial<MetaField>[]>("GET", `${draftOrderId}/metafields.json`, 'metafields', options);
    }

    /**
     * Returns the number of metafields belonging to the given draftOrder.
     * @param id The draftOrder's id.
     */
     public countMetafields(draftOrderId: number) {
        return this.createRequest<number>("GET", `${draftOrderId}/metafields/count.json`, 'count');
    }

    /**
     * Gets the metafield with the given id from an draftOrder.
     * @param draftOrderId The draftOrder's id.
     * @param id The metafield's id.
     */
    public getMetafield(draftOrderId: number, id: number) {
        return this.createRequest<Partial<MetaField>>("GET", `${draftOrderId}/metafields/${id}.json`, 'metafield');
    }

    /**
     * Creates a metafield for the given draftOrder.
     * @param draftOrderId The draftOrder's id.
     * @param id The metafield's id.
     * @param metafield Options for the metafield
     */
     public createMetafield(draftOrderId: number, metafield: Partial<MetaFieldUpdateCreate>) {
        return this.createRequest<Partial<MetaField>>("POST", `${draftOrderId}/metafields.json`, 'metafield', { metafield });
    }

    /**
     * Updates a metafield for the given draftOrder
     * @param draftOrderId The draftOrder's id.
     * @param id The metafield's id.
     * @param metafield Options for the metafield
     */
     public updateMetafield(draftOrderId: number, id: number, metafield?: Partial<MetaFieldUpdateCreate>) {
        return this.createRequest<Partial<MetaField>>("PUT", `${draftOrderId}/metafields/${id}.json`, 'metafield', { metafield });
    }

    /**
     * Deletes the metafield with the given id from an draftOrder.
     * @param draftOrderId The draftOrder's id.
     * @param id The metafield's id.
     */
     public deleteMetafield(draftOrderId: number, id: number) {
        return this.createRequest<undefined>("DELETE", `${draftOrderId}/metafields/${id}.json`, 'metafield');
    }
}

export default DraftOrders;
