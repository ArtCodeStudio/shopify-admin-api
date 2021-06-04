import { Order } from  '../order';

export interface WebhookOrdersCancelled extends Order {};
export interface WebhookOrdersCreate extends Order {};
export interface WebhookOrdersFulfilled extends Order {};
export interface WebhookOrdersPaid extends Order {};
export interface WebhookOrdersPartiallyFulfilled extends Order {};
export interface WebhookOrdersUpdated extends Order {};