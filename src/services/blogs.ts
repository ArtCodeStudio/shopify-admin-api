import * as Options from '../options';
import { BaseService } from '../infrastructure';
import { Blog, MetaField, MetaFieldUpdateCreate } from '../interfaces';

/**
 * A service for manipulating a Shopify shop's blogs. For manipulating a blog's posts, use the Articles class instead.
 */
export class Blogs extends BaseService {
    constructor(shopDomain: string, accessToken: string) {
        super(shopDomain, accessToken, "blogs");
    }

    /**
     * Creates a new blog.
     * @param blog The Blog being created.
     */
    public create(blog: Partial<Blog>) {
        return this.createRequest<Blog>("POST", `.json`, "blog", { blog });
    }

    /**
     * Gets a blog with the given id.
     * @param id Id of the blog to retrieve.
     * @param options Options for filtering the result.
     */
    public get(id: number, options?: Options.BlogGetOptions) {
        return this.createRequest<Blog>("GET", `${id}.json`, "blog", options);
    }

    /**
     * Updates the blog with the given id.
     * @param id Id of the blog being updated.
     * @param blog The updated blog.
     */
    public update(id: number, blog:  Partial<Blog>) {
        return this.createRequest<Blog>("PUT", `${id}.json`, "blog", { blog });
    }

    /**
     * Gets a list of all blogs on the shop.
     * @param options Options for filtering the results.
     */
    public list(options?: Options.BlogListOptions) {
        return this.createRequest<Blog[]>("GET", `.json`, "blogs", options);
    }

    /**
     * Gets a count of all blogs on the shop.
     */
    public count(options?: Options.BlogCountOptions) {
        return this.createRequest<number>("GET", "count.json", "count");
    }

    /**
     * Deletes the blog with the given id.
     * @param id Id of the blog being deleted.
     */
    public delete(id: number) {
        return this.createRequest<void>("DELETE", `${id}.json`);
    }

    /**
     * Gets a list of up to 250 metafields from the given blog.
     * @param id The blog's id.
     * @param options Options for filtering the results.
     */
     public listMetafields(blogId: number, options?: Options.MetafieldListOptions) {
        return this.createRequest<Partial<MetaField>[]>("GET", `${blogId}/metafields.json`, 'metafields', options);
    }

    /**
     * Returns the number of metafields belonging to the given blog.
     * @param id The blog's id.
     */
     public countMetafields(blogId: number) {
        return this.createRequest<number>("GET", `${blogId}/metafields/count.json`, 'count');
    }

    /**
     * Gets the metafield with the given id from an blog.
     * @param blogId The blog's id.
     * @param id The metafield's id.
     */
    public getMetafield(blogId: number, id: number) {
        return this.createRequest<Partial<MetaField>>("GET", `${blogId}/metafields/${id}.json`, 'metafield');
    }

    /**
     * Creates a metafield for the given blog.
     * @param blogId The blog's id.
     * @param id The metafield's id.
     * @param metafield Options for the metafield
     */
     public createMetafield(blogId: number, metafield: Partial<MetaFieldUpdateCreate>) {
        return this.createRequest<Partial<MetaField>>("POST", `${blogId}/metafields.json`, 'metafield', { metafield });
    }

    /**
     * Updates a metafield for the given blog
     * @param blogId The blog's id.
     * @param id The metafield's id.
     * @param metafield Options for the metafield
     */
     public updateMetafield(blogId: number, id: number, metafield?: Partial<MetaFieldUpdateCreate>) {
        return this.createRequest<Partial<MetaField>>("PUT", `${blogId}/metafields/${id}.json`, 'metafield', { metafield });
    }

    /**
     * Deletes the metafield with the given id from an blog.
     * @param blogId The blog's id.
     * @param id The metafield's id.
     */
     public deleteMetafield(blogId: number, id: number) {
        return this.createRequest<undefined>("DELETE", `${blogId}/metafields/${id}.json`, 'metafield');
    }
}

export default Blogs;