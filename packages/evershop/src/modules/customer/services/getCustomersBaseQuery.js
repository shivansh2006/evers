import { select } from '@amohajewellery/postgres-query-builder';

export const getCustomersBaseQuery = () => {
  const query = select().from('customer');

  return query;
};
