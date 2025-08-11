/* eslint-disable camelcase */
const {
  rollback,
  commit,
  startTransaction,
  del,
  select
} = require('@amohajewellery/postgres-query-builder');
const {
  getConnection
} = require('@amohajewellery/amohajewellery/src/lib/postgres/connection');
const {
  OK,
  INTERNAL_SERVER_ERROR,
  INVALID_PAYLOAD
} = require('@amohajewellery/amohajewellery/src/lib/util/httpStatus');
const { error } = require('@amohajewellery/amohajewellery/src/lib/log/logger');

// eslint-disable-next-line no-unused-vars
module.exports = async (request, response, deledate, next) => {
  const { id } = request.params;
  const connection = await getConnection();
  await startTransaction(connection);
  try {
    // Load the shipping zone
    const shippingZone = await select()
      .from('shipping_zone')
      .where('uuid', '=', id)
      .load(connection);

    if (!shippingZone) {
      response.status(INVALID_PAYLOAD);
      response.json({
        error: {
          status: INVALID_PAYLOAD,
          message: 'Invalid zone id'
        }
      });
      return;
    }
    await del('shipping_zone').where('uuid', '=', id).execute(connection);
    await commit(connection);
    response.status(OK);
    response.json({
      data: shippingZone
    });
  } catch (e) {
    error(e);
    await rollback(connection);
    response.status(INTERNAL_SERVER_ERROR);
    response.json({
      error: {
        status: INTERNAL_SERVER_ERROR,
        message: e.message
      }
    });
  }
};
