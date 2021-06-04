import { Checkout } from './checkout'

export interface CheckoutUpdate extends Partial<Checkout> {
    /**
     * A unique identifier for a particular checkout.
     */
    token: string;
};
