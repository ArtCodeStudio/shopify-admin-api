import { FieldOptions, ListOptions } from './base';

export interface TransactionBaseOptions extends FieldOptions{
  /**
   * Show amounts in the shop currency (BETA)
   */
  in_shop_currency?: boolean;
}

export interface TransactionListOptions extends TransactionBaseOptions, ListOptions {}
export interface TransactionGetOptions extends TransactionBaseOptions {}
export interface TransactionCountOptions extends TransactionBaseOptions {}