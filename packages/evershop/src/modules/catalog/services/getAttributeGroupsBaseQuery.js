import { select } from '@amohajewellery/postgres-query-builder';

export const getAttributeGroupsBaseQuery = () =>
  select().from('attribute_group');
