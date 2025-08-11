import { select, SelectQuery } from '@amohajewellery/postgres-query-builder';

export const getCustomersBaseQuery = (): SelectQuery => {
  const query = select().from('customer');

  return query;
};
