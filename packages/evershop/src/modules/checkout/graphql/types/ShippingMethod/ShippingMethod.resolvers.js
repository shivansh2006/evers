const { select } = require('@amohajewellery/postgres-query-builder');
const { pool } = require('@amohajewellery/amohajewellery/src/lib/postgres/connection');
const { camelCase } = require('@amohajewellery/amohajewellery/src/lib/util/camelCase');

module.exports = {
  Query: {
    shippingMethods: async () => {
      const shippingMethods = await select()
        .from('shipping_method')
        .orderBy('shipping_method_id', 'DESC')
        .execute(pool);
      return shippingMethods.map((row) => camelCase(row));
    }
  }
};
