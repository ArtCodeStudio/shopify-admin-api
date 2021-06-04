import { FieldOptions, ListOptions, PublishedOptions, DateOptions } from './base';

export interface PageBaseOptions {
  /**
   * Retrieve pages with a given title.
   */
  title?: string;
}

export interface PageCountOptions extends PageBaseOptions, DateOptions, PublishedOptions {}

export interface PageGetOptions extends FieldOptions {}

export interface PageListOptions extends PageBaseOptions, ListOptions, DateOptions, PublishedOptions, FieldOptions {
  /**
   * Retrieve a page with a given handle.
   */
  handle?: string;
}