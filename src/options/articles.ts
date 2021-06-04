import { FieldOptions, ListOptions, PublishedOptions, DateOptions, SinceIdOptions } from './base';

export interface ArticleBaseOptions {}

/**
 * Options to retrieves a count of all articles from a blog
 */
export interface ArticleCountOptions extends ArticleBaseOptions, DateOptions, PublishedOptions {}

/**
 * Options to retrieves a single article
 */
export interface ArticleGetOptions extends FieldOptions {}

/**
 * Options to retrieves a list of all articles from a blog.
 */
export interface ArticleListOptions extends ArticleBaseOptions, ListOptions, DateOptions, PublishedOptions, FieldOptions, SinceIdOptions {
  /**
   * Retrieve a article with a given handle.
   */
  handle?: string;

  /**
   * Filter articles with a specific tag.
   */
  tag?: string;

  /**
   * Filter articles by article author.
   */
  author?: string;
}

/**
 * Options to retrieves a list all of article authors
 */
export interface ArticleAuthorListOptions {}

/**
 * Options to retrieves a list of all the tags
 */
export interface ArticleTagListOptions {
    /**
     * A flag to indicate only to a certain number of the most popular tags.
     */
    popular?: number;

    /**
     * The number of tags to return.
     */
    limit?: number;
}