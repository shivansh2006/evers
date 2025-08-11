import { emit } from '@amohajewellery/amohajewellery/src/lib/event/emitter.js';
import { pool } from '@amohajewellery/amohajewellery/src/lib/postgres/connection.js';
import { select } from '@amohajewellery/postgres-query-builder';

// eslint-disable-next-line no-unused-vars
export default async (request, response, delegate, next) => {
  // Get the order data from $body
  const newOrder = response.$body?.data || {};
  if (newOrder.payment_method !== 'cod') {
    return next();
  } else {
    const order = await select()
      .from('order')
      .where('order_id', '=', newOrder.order_id)
      .load(pool);
    await emit('order_placed', { ...order });
    return next();
  }
};
