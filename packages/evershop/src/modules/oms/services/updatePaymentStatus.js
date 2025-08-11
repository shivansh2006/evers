import { error } from '@amohajewellery/amohajewellery/src/lib/log/logger.js';
import { pool } from '@amohajewellery/amohajewellery/src/lib/postgres/connection.js';
import { getConfig } from '@amohajewellery/amohajewellery/src/lib/util/getConfig.js';
import { hookable } from '@amohajewellery/amohajewellery/src/lib/util/hookable.js';
import {
  update,
  getConnection,
  startTransaction,
  rollback,
  commit
} from '@amohajewellery/postgres-query-builder';

function validatePaymentStatusBeforeUpdate(status) {
  const paymentStatusList = getConfig('oms.order.paymentStatus', {});
  if (!paymentStatusList[status]) {
    throw new Error('Invalid status');
  }
  return false;
}

async function changePaymentStatus(orderId, status, connection) {
  const order = await update('order')
    .given({
      payment_status: status
    })
    .where('order_id', '=', orderId)
    .execute(connection);
  return order;
}

export const updatePaymentStatus = async (orderId, status, conn) => {
  const connection = conn || (await getConnection(pool));
  try {
    if (!conn) {
      await startTransaction(connection);
    }
    hookable(validatePaymentStatusBeforeUpdate, { orderId })(status);
    await hookable(changePaymentStatus, { orderId, status })(
      orderId,
      status,
      connection
    );
    if (!conn) {
      await commit(connection);
    }
  } catch (err) {
    error(err);
    if (!conn) {
      await rollback(connection);
    }
    throw err;
  }
};
