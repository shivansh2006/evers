import { buildUrl } from '@amohajewellery/amohajewellery/src/lib/router/buildUrl.js';
import { camelCase } from '@amohajewellery/amohajewellery/src/lib/util/camelCase.js';
import { select } from '@amohajewellery/postgres-query-builder';

export default {
  Query: {
    currentCustomer: async (root, args, { customer }) =>
      customer ? camelCase(customer) : null
  },
  Customer: {
    addresses: async (customer, args, { pool }) => {
      const addresses = await select()
        .from('customer_address')
        .where('customer_id', '=', customer.customerId)
        .execute(pool);

      return addresses.map((address) => ({
        ...camelCase(address),
        updateApi: buildUrl('updateCustomerAddress', {
          address_id: address.uuid,
          customer_id: customer.uuid
        }),
        deleteApi: buildUrl('deleteCustomerAddress', {
          address_id: address.uuid,
          customer_id: customer.uuid
        })
      }));
    },
    addAddressApi: (customer) =>
      buildUrl('createCustomerAddress', {
        customer_id: customer.uuid
      })
  }
};
