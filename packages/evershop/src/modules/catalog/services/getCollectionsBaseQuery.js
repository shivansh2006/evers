import { select } from '@amohajewellery/postgres-query-builder';

export const getCollectionsBaseQuery = () => {
  const query = select().from('collection');
  return query;
};
