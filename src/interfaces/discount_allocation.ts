import { PriceSet } from './price_set';

export interface DiscountAllocation {
    /**
     *  The discount amount allocated to the line.
     */
    amount: number;

    /**
     *  The discount amount allocated to the line item in shop and presentment currencies.
     *  (BETA)
     */
    amount_set: PriceSet;

    /**
     *  The index of the associated discount application in the order's discount_applications list.
     */
    discount_application_index: number;
}
