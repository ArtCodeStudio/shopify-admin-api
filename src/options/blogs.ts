import { FieldOptions, ListOptions, SinceIdOptions } from './base';

export interface BlogBaseOptions {}

/**
 * Get a count of all blogs.
 */
export interface BlogCountOptions extends BlogBaseOptions {}

/**
 * Get a single blog by its ID.
 */
export interface BlogGetOptions extends FieldOptions {}

/**
 * Get a list of all blogs.
 */
export interface BlogListOptions extends BlogBaseOptions, FieldOptions, SinceIdOptions {
  /**
   * Retrieve a page with a given handle.
   */
  handle?: string;
}