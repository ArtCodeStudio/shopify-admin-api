import { ListOptions, SinceIdOptions, FieldOptions, DateOptions, PublishedOptions } from "./base";

export interface CommentListOptions extends ListOptions, FieldOptions, DateOptions, PublishedOptions {
  // Retrieve only comments of a certain blog
  blog_id?: number;
  // Retrieve only comments for a certain article of a blog
  article_id?: number;
  // Filter results by their status.
  status?: "pending" | "published" | "unapproved";
};

export interface CommentCountOptions extends SinceIdOptions, DateOptions, PublishedOptions {
    // Count only comments of a certain blog
    blog_id?: number;
    // Count only comments for a certain article of a blog
    article_id?: number;
    // Filter results by their status.
    status?: "pending" | "published" | "unapproved";
}

export interface CommentGetOptions extends FieldOptions {};