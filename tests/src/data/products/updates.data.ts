import { IProductTestData } from '../interfaces';
/**
 * Example products to test product updates
 * @see https://help.shopify.com/en/api/reference/products/product#create
 */
export const updateProducts: IProductTestData[] = [
  {
    info: 'Update a product\'s title',
    product: {
      title: 'New product title',
    },
  },
  {
    info: 'Barnes & Noble, John\'s Fav',
    product: {
      tags: ``,
    },
  },
  {
    info: 'Update a product by clearing product images',
    product: {
      images: [],
    },
  },
  {
    info: 'Update a product by adding a new product image',
    product: {
      images: [
        {
          src: 'http://example.com/rails_logo.gif',
        },
      ],
    },
  },
  {
    info: 'Update a product by reordering product image',
    product: {
      images: [
        {
          position: 2,
        },
        {
          position: 1,
        },
      ],
    },
  },
  {
    info: 'Update a product by reordering the product variants',
    product: {
      variants: [],
    },
  },
  {
    info: 'Update a product and one of its variants',
    product: {
      title: 'Updated Product Title',
      variants: [
        {
          price: '2000.00',
          sku: 'Updating the Product SKU',
        },
      ],
    },
  },
  {
    info: 'Update a product\'s SEO title and description',
    product: {
      metafields_global_title_tag: 'Brand new title',
      metafields_global_description_tag: 'Brand new description',
    },
  },
  {
    info: 'Show a hidden product by changing the published attribute to true',
    product: {
      published: true,
    },
  },
  {
    info: 'Hide a published product by changing the published attribute to false',
    product: {
      published: false,
    },
  },
  {
    info: 'Add a metafield to an existing product',
    product: {
      metafields: [
        {
          key: 'new',
          value: 'newvalue',
          value_type: 'string',
          namespace: 'global',
        },
      ],
    },
  },
];