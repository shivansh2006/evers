import { select } from '@amohajewellery/postgres-query-builder';
import type { SelectQuery } from '@amohajewellery/postgres-query-builder';

export const getCollectionsBaseQuery = (): SelectQuery => {
  const query = select().from('collection');
  return query;
};
