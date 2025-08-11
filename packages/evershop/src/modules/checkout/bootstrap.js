import { error } from '@amohajewellery/amohajewellery/src/lib/log/logger.js';
import {
  addProcessor,
  addFinalProcessor
} from '@amohajewellery/amohajewellery/src/lib/util/registry.js';
import { sortFields } from '@amohajewellery/amohajewellery/src/modules/checkout/services/cart/sortFields.js';
import { registerCartBaseFields } from '@amohajewellery/amohajewellery/src/modules/checkout/services/cart/registerCartBaseFields.js';
import { registerCartItemBaseFields } from '@amohajewellery/amohajewellery/src/modules/checkout/services/cart/registerCartItemBaseFields.js';
import { getProductsBaseQuery } from '@amohajewellery/amohajewellery/src/modules/catalog/services/getProductsBaseQuery.js';
import { pool } from '@amohajewellery/amohajewellery/src/lib/postgres/connection.js';
import { merge } from '@amohajewellery/amohajewellery/src/lib/util/merge.js';

export default () => {
  addProcessor('cartFields', registerCartBaseFields, 0);

  addProcessor('cartItemFields', registerCartItemBaseFields, 0);

  addFinalProcessor('cartFields', (fields) => {
    try {
      const sortedFields = sortFields(fields);
      return sortedFields;
    } catch (e) {
      error(e);
      throw e;
    }
  });

  addFinalProcessor('cartItemFields', (fields) => {
    try {
      const sortedFields = sortFields(fields);
      return sortedFields;
    } catch (e) {
      error(e);
      throw e;
    }
  });

  addProcessor('cartItemProductLoaderFunction', () => async (id) => {
    const productQuery = getProductsBaseQuery();
    const product = await productQuery.where('product_id', '=', id).load(pool);
    return product;
  });

  addProcessor('configuratonSchema', (schema) => {
    merge(schema, {
      properties: {
        checkout: {
          type: 'object',
          properties: {
            showShippingNote: {
              type: 'boolean'
            }
          }
        }
      }
    });
    return schema;
  });
};
