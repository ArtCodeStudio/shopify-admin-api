import { Fulfillment } from  '../fulfillment';
import { Destination } from  '../destination';


export interface WebhookFulfillmentBase extends Partial<Fulfillment> {
    destination: Destination;
    email: string;
};