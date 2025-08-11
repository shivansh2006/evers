import { select } from '@amohajewellery/postgres-query-builder';

export const getAttributesBaseQuery = () => select().from('attribute');
