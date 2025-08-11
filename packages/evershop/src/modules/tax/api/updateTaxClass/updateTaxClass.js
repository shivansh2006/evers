/* eslint-disable camelcase */
import {
  rollback,
  commit,
  startTransaction,
  select,
  update
} from '@amohajewellery/postgres-query-builder';
import { getConnection } from '@amohajewellery/amohajewellery/src/lib/postgres/connection.js';
import {
  OK,
  INTERNAL_SERVER_ERROR,
  INVALID_PAYLOAD
} from '@amohajewellery/amohajewellery/src/lib/util/httpStatus.js';

// eslint-disable-next-line no-unused-vars
export default async (request, response, delegate, next) => {
  const { id } = request.params;
  const connection = await getConnection();
  await startTransaction(connection);
  const { name } = request.body;
  try {
    // Load the tax class
    const taxClass = await select()
      .from('tax_class')
      .where('uuid', '=', id)
      .load(connection);

    if (!taxClass) {
      response.status(INVALID_PAYLOAD);
      response.json({
        error: {
          status: INVALID_PAYLOAD,
          message: 'Invalid class id'
        }
      });
      return;
    }
    const newClass = await update('tax_class')
      .given({
        name
      })
      .where('uuid', '=', id)
      .execute(connection);

    await commit(connection);
    response.status(OK);
    response.json({
      data: newClass
    });
  } catch (e) {
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
