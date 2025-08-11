import { select } from '@amohajewellery/postgres-query-builder';
import { pool } from '@amohajewellery/amohajewellery/src/lib/postgres/connection.js';
import { camelCase } from '@amohajewellery/amohajewellery/src/lib/util/camelCase.js';
import { buildUrl } from '@amohajewellery/amohajewellery/src/lib/router/buildUrl.js';

export default {
  Query: {
    shippingMethods: async () => {
      const shippingMethods = await select()
        .from('shipping_method')
        .orderBy('shipping_method_id', 'DESC')
        .execute(pool);
      return shippingMethods.map((row) => camelCase(row));
    }
  },
  ShippingMethod: {
    updateApi: ({ uuid }) => buildUrl('updateShippingMethod', { id: uuid })
  }
};
