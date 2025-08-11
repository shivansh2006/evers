import { select } from '@amohajewellery/postgres-query-builder';

export const getCustomerGroupsBaseQuery = () => {
  const query = select().from('customer_group');

  return query;
};
