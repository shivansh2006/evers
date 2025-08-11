const stripePayment = require('stripe');
const { getConfig } = require('@amohajewellery/amohajewellery/src/lib/util/getConfig');
const { error } = require('@amohajewellery/amohajewellery/src/lib/log/logger');
const { select } = require('@amohajewellery/postgres-query-builder');
const { pool } = require('@amohajewellery/amohajewellery/src/lib/postgres/connection');
const { getSetting } = require('../../setting/services/setting');

async function cancelPaymentIntent(orderID) {
  try {
    const transaction = await select()
      .from('payment_transaction')
      .where('payment_transaction_order_id', '=', orderID)
      .load(pool);
    if (!transaction) {
      return;
    }
    const stripeConfig = getConfig('system.stripe', {});
    let stripeSecretKey;

    if (stripeConfig.secretKey) {
      stripeSecretKey = stripeConfig.secretKey;
    } else {
      stripeSecretKey = await getSetting('stripeSecretKey', '');
    }
    const stripe = stripePayment(stripeSecretKey);

    // Get the payment intent
    const paymentIntent = await stripe.paymentIntents.retrieve(
      transaction.transaction_id
    );
    if (!paymentIntent) {
      throw new Error('Can not find payment intent');
    }
    if (paymentIntent.status === 'canceled') {
      return;
    }
    await stripe.paymentIntents.cancel(transaction.transaction_id);
  } catch (err) {
    error(err);
    throw err;
  }
}

module.exports.cancelPaymentIntent = cancelPaymentIntent;
