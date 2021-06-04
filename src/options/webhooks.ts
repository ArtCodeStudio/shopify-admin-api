import { WebhookTopic } from "../enums/webhook_topic";
import * as Options from '../options';

export interface WebhookBaseOptions {
    /**
     * Retrieve only webhooks that possess the URI where the webhook sends the POST request when the event occurs.
     */
    address?: string;

    /**
     * Retrieve only webhooks with a given topic.
     */
    topic?: WebhookTopic;
}

export interface WebhookListOptions extends WebhookBaseOptions, Options.ListOptions, Options.DateOptions, Options.FieldOptions {}
export interface WebhookCountOptions extends WebhookBaseOptions {}
export interface WebhookGetOptions extends Options.FieldOptions {}