import * as Options from '../options';
import { Article } from '../models';
import { BaseService } from '../infrastructure';

/**
 * A service for manipulating a blog's articles.
 */
export class Articles extends BaseService {
    constructor(shopDomain: string, accessToken: string) {
        super(shopDomain, accessToken, "");
    }

    /**
     * Creates a new article.
     * @param blogId Id of the blog that the article will belong to.
     * @param article The article being created.
     */
    public create(blogId: number, article: Partial<Article>) {
        return this.createRequest<Article>("POST", `blogs/${blogId}/articles.json`, "article", { article });
    }

    /**
     * Updates an article with the given id.
     * @param blogId Id of the blog that the article belongs to.
     * @param articleId Id of the article to update.
     * @param article The updated article.
     */
    public update(blogId: number, articleId: number, article: Partial<Article>) {
        return this.createRequest<Article>("PUT", `blogs/${blogId}/articles/${articleId}.json`, "article", { article });
    }

    /**
     * Gets an article with the given id.
     * @param blogId Id of the blog that the article belongs to.
     * @param articleId Id of the article being retrieved.
     * @param options Options for filtering the result.
     */
    public get(blogId: number, articleId: number, options?: Options.FieldOptions) {
        return this.createRequest<Article>("GET", `blogs/${blogId}/articles/${articleId}.json`, "article", options);
    }

    /**
     * Lists up to 250 articles for the given blog.
     * @param blogId Id of the blog that the articles belong to.
     * @param options Options for filtering the results.
     */
    public list(blogId: number, options?: Options.FieldOptions & Options.DateOptions & Options.ListOptions & Options.PublishedOptions & Options.ArticleListOptions) {
        return this.createRequest<Article[]>("GET", `blogs/${blogId}/articles.json`, "articles", options);
    }

    /**
     * Counts the articles on the given blog.
     * @param blogId Id of the blog that the articles belong to.
     * @param options Options for filtering the results.
     */
    public count(blogId: number, options?: Options.DateOptions & Options.PublishedOptions) {
        return this.createRequest<number>("GET", `blogs/${blogId}/articles/count.json`, "count", options);
    }

    /**
     * Deletes the article with the given id.
     * @param blogId Id of the blog that the article belongs to.
     * @param articleId Id of the article to delete.
     */
    public delete(blogId: number, articleId: number) {
        return this.createRequest<void>("DELETE", `blogs/${blogId}/articles/${articleId}.json`);
    }

    /**
     * Gets a list of all article authors.
     */
    public listAuthors() {
        return this.createRequest<string[]>("GET", `articles/authors.json`, "authors");
    }

    /**
     * Gets a list of all article tags.
     * @param options Options for filtering the results.
     */
    public listTags(options?: Options.ArticleTagListOptions) {
        return this.createRequest<string[]>("GET", `articles/tags.json`, "tags", options);
    }

    /**
     * Gets a list of all article tags for the given blog.
     * @param blogId Id of the blog that the tags belong to.
     * @param options Options for filtering the results.
     */
    public listTagsForBlog(blogId: number, options?: Options.ArticleTagListOptions) {
        return this.createRequest<string[]>("GET", `blogs/${blogId}/articles/tags.json`, "tags", options);
    }
}

export default Articles;