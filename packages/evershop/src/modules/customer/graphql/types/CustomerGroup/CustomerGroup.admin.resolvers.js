import { select } from '@amohajewellery/postgres-query-builder';
import { buildUrl } from '@amohajewellery/amohajewellery/src/lib/router/buildUrl.js';
import { camelCase } from '@amohajewellery/amohajewellery/src/lib/util/camelCase.js';
import { getCustomerGroupsBaseQuery } from '../../../services/getCustomerGroupsBaseQuery.js';
import { CustomerGroupCollection } from '../../../services/CustomerGroupCollection.js';

export default {
  Query: {
    customerGroup: async (root, { id }, { pool }) => {
      const group = await select()
        .from('customer_group')
        .where('customer_group.customer_group_id', '=', id)
        .load(pool);

      return group ? camelCase(group) : null;
    },
    customerGroups: async (_, { filters = [] }) => {
      const query = getCustomerGroupsBaseQuery();
      const root = new CustomerGroupCollection(query);
      await root.init({}, { filters });
      return root;
    }
  },
  CustomerGroup: {
    customers: async (group, _, { pool }) => {
      const customers = await select()
        .from('customer')
        .where('customer.group_id', '=', group.customerGroupId)
        .execute(pool);
      return customers.map((customer) => camelCase(customer));
    },
    editUrl: (group) =>
      buildUrl('customerGroupEdit', { id: group.customerGroupId })
  }
};
