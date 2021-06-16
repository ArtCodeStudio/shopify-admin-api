
import { IProductTestData } from '../interfaces';
/**
 * Example products to test product creates
 * @see https://help.shopify.com/en/api/reference/products/product#create
 */
export const createProducts: IProductTestData[] = [
  {
    info: 'Create a new product with the default product variant',
    product: {
      title: 'Burton Custom Freestyle 151',
      body_html: '<strong>Good snowboard!</strong>',
      vendor: 'Burton',
      product_type: 'Snowboard',
      tags: `Barnes & Noble, John's Fav, "Big Air"`,
    },
  },
  {
    info: 'Create a new unpublished product',
    product: {
      title: 'Burton Custom Freestyle 151',
      body_html: '<strong>Good snowboard!</strong>',
      vendor: 'Burton',
      product_type: 'Snowboard',
      published: false,
    },
  },
  {
    info: 'Create a new product with multiple product variants',
    product: {
      title: 'Burton Custom Freestyle 151',
      body_html: '<strong>Good snowboard!</strong>',
      vendor: 'Burton',
      product_type: 'Snowboard',
      variants: [
        {
          option1: 'First',
          price: '10.00',
          sku: '123',
        },
        {
          option1: 'Second',
          price: '20.00',
          sku: '123',
        },
      ],
    },
  },
  {
    info: 'Create a new product with multiple product variants and multiple options',
    product: {
      title: 'Burton Custom Freestyle 151',
      body_html: '<strong>Good snowboard!</strong>',
      vendor: 'Burton',
      product_type: 'Snowboard',
      variants: [
        {
          option1: 'Blue',
          option2: '155',
        },
        {
          option1: 'Black',
          option2: '159',
        },
      ],
      options: [
        {
          name: 'Color',
          values: [
            'Blue',
            'Black',
          ],
        },
        {
          name: 'Size',
          values: [
            '155',
            '159',
          ],
        },
      ],
    },
  },
  {
    info: 'Create a new product with the default variant and base64 encoded image',
    product: {
      title: 'Burton Custom Freestyle 151',
      body_html: '<strong>Good snowboard!</strong>',
      vendor: 'Burton',
      product_type: 'Snowboard',
      images: [
        {
          attachment: 'R0lGODlhAQABAIAAAAAAAAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==\n',
        },
      ],
    },
  },
  {
    info: 'Create a new product with the default variant and a product image that will be downloaded by Shopify',
    product: {
      title: 'Burton Custom Freestyle 151',
      body_html: '<strong>Good snowboard!</strong>',
      vendor: 'Burton',
      product_type: 'Snowboard',
      images: [
        {
          src: 'http://example.com/rails_logo.gif',
        },
      ],
    },
  },
  {
    info: 'Creating a product without a title will return an error',
    product: {
      body_html: 'A mystery!',
    },
  },
];
