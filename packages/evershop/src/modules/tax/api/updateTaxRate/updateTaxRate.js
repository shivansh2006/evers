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
  const connection = await getConnection();
  await startTransaction(connection);
  const { id } = request.params;
  const { name, country, province, postcode, rate, is_compound, priority } =
    request.body;
  try {
    const taxRate = await select()
      .from('tax_rate')
      .where('uuid', '=', id)
      .load(connection);

    if (!taxRate) {
      response.status(INVALID_PAYLOAD);
      response.json({
        error: {
          status: INVALID_PAYLOAD,
          message: 'Tax rate not found'
        }
      });
      return;
    }

    const newRate = await update('tax_rate')
      .given({
        name,
        country,
        province,
        postcode,
        rate,
        is_compound,
        priority
      })
      .where('uuid', '=', id)
      .execute(connection);
    await commit(connection);
    response.status(OK);
    response.json({
      data: newRate
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
