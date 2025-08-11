import { select } from '@amohajewellery/postgres-query-builder';
import { camelCase } from '@amohajewellery/amohajewellery/src/lib/util/camelCase.js';

export default {
  Customer: {
    group: async ({ groupId }, _, { pool }) => {
      const group = await select()
        .from('customer_group')
        .where('customer_group.customer_group_id', '=', groupId)
        .load(pool);
      return group ? camelCase(group) : null;
    }
  }
};
