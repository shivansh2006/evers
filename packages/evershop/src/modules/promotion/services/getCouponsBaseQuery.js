import { select } from '@amohajewellery/postgres-query-builder';

export const getCouponsBaseQuery = () => {
  const query = select().from('coupon');

  return query;
};
