/**
 * Note: This interface is not extended from ShopifyObject because it has not a default id
 */
export interface AssetUpdateCreate {
    /**
     * A base64-encoded image.
     */
    attachment?: string;

    /**
     * The path to the asset within a theme. It consists of the file's directory and filename. For example, the asset assets/bg-body-green.gif is in the assets directory, so its key is assets/bg-body-green.gif.
     */
    key: string;

    /**
     * The text content of the asset, such as the HTML and Liquid markup of a template file.
     */
    value?: string;

    /**
     * The source URL of an image. Include in the body of the PUT request to upload the image to Shopify.
     */
    src?: string;

    /**
     * The path within the theme to an existing asset. Include in the body of the PUT request to create a duplicate asset.
     */
    source_key?: string;
}