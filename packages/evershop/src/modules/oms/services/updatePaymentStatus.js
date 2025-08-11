const { error } = require('@amohajewellery/amohajewellery/src/lib/log/logger');
const { pool } = require('@amohajewellery/amohajewellery/src/lib/postgres/connection');
const { getConfig } = require('@amohajewellery/amohajewellery/src/lib/util/getConfig');
const { hookable } = require('@amohajewellery/amohajewellery/src/lib/util/hookable');
const {
  update,
  getConnection,
  startTransaction,
  rollback,
  commit
} = require('@amohajewellery/postgres-query-builder');

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

module.exports.updatePaymentStatus = async (orderId, status, conn) => {
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
