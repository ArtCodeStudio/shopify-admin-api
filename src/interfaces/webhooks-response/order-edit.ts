export interface Addition {
    id: number;
    delta: number;
}

export interface Removal {
    id: number;
    delta: number;
}

export interface LineItems {
    additions: Addition[];
    removals: Removal[];
}

export interface OrderEdit {
    id: number;
    app_id?: any;
    created_at: Date;
    notify_customer: boolean;
    order_id: number;
    staff_note: string;
    user_id?: any;
    line_items: LineItems;
}

/**
 * TODO check if we can reuse interfaces from model in this interfaces
 */
export interface WebhookOrdersEdited {
    order_edit: OrderEdit;
}
