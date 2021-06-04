import { FieldOptions, ListOptions } from './base';

export interface CheckoutBaseOptions {}

export interface CheckoutListOptions extends CheckoutBaseOptions, ListOptions, FieldOptions {}

export interface CheckoutGetOptions extends FieldOptions {}
