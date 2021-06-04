import * as Options from '../options';
import { BaseService } from '../infrastructure';
import { Comment } from '../interfaces';

/**
 * A service for manipulating Shopify's Blog Comments API.
 */
export class Comments extends BaseService {
    constructor(shopDomain: string, accessToken: string) {
      super(shopDomain, accessToken, "comments");
    }

    /**
     * Creates a comment for an article.
     * @param comment partial comment object with properties for creation
     * 
     * required fields:
     * * body (is rendered from Textile markup into HTML in `body_html` field),
     * * author
     * * email
     */
    public create(comment: Partial<Comment>) {
      return this.createRequest<Comment>("POST", ".json", "comment", { comment });
    }

    /**
     * Updates a comment of an article.
     * @param id The id of the comment to update.
     * @param comment partial comment object with properties to update
     */
    public update(id: number, comment: Partial<Comment>) {
      return this.createRequest<Comment>("PUT", `${id}.json`, "comment", { comment });
    }

    /**
     * Gets a count of comments
     * @param options Options for filtering the result.
     */
    public count(options?: Options.CommentCountOptions) {
      return this.createRequest<Comment>("GET", "count.json", "count", options);
    }

    /**
     * Gets a commect with the given id.
     * @param id The id of the comment to get.
     * @param options Options for filtering the result.
     */
    public get(id: number, options?: Options.CommentGetOptions) {
      return this.createRequest<Comment>("GET", `${id}.json`, "comment", options);
    }

    /**
     * Retrieves a list of up to 250 comments.
     * @param options Options for pagination and filtering the result.
     */
    public list(options?: Options.CommentListOptions) {
      return this.createRequest<Comment[]>("GET", ".json", "comments", options);
    }

    /**
     * Marks the commect with the given id as spam.
     * @param id The id of the comment to mark as spam.
     */
    public spam(id: number) {
      return this.createRequest<Comment>("POST", `${id}/spam.json`);
    }

    /**
     * Marks the commect with the given id as not spam.
     * @param id The id of the comment to mark as not spam.
     */
    public notSpam(id: number) {
      return this.createRequest<Comment>("POST", `${id}/not_spam.json`);
    }

    /**
     * Approves the comment with the given id.
     * @param id The id of the comment to approve.
     */
    public approve(id: number) {
      return this.createRequest<Comment>("POST", `${id}/approve.json`);
    }

    /**
     * Removes the comment with the given id.
     * @param id The id of the comment to remove.
     */
    public remove(id: number) {
      return this.createRequest<Comment>("POST", `${id}/remove.json`);
    }

    /**
     * Restores the removed comment with the given id.
     * @param id The id of the removed comment to restore.
     */
    public restore(id: number) {
      return this.createRequest<Comment>("POST", `${id}/restore.json`);
    }
}

export default Comments;