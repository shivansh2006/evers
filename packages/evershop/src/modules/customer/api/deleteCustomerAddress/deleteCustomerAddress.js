import {
  OK,
  INTERNAL_SERVER_ERROR,
  INVALID_PAYLOAD
} from '@amohajewellery/amohajewellery/src/lib/util/httpStatus.js';
import { select } from '@amohajewellery/postgres-query-builder';
import { pool } from '@amohajewellery/amohajewellery/src/lib/postgres/connection.js';
import deleteCustomerAddress from '../../services/customer/address/deleteCustomerAddress.js';

// eslint-disable-next-line no-unused-vars
export default async (request, response, delegate, next) => {
  try {
    const customer = await select()
      .from('customer')
      .where('uuid', '=', request.params.customer_id)
      .load(pool);
    if (!customer) {
      response.status(INVALID_PAYLOAD);
      return response.json({
        error: {
          status: INVALID_PAYLOAD,
          message: 'Invalid customer'
        }
      });
    }
    const address = await select()
      .from('customer_address')
      .where('uuid', '=', request.params.address_id)
      .and('customer_id', '=', customer.customer_id)
      .load(pool);
    if (!address) {
      response.status(INVALID_PAYLOAD);
      return response.json({
        error: {
          status: INVALID_PAYLOAD,
          message: 'Invalid address'
        }
      });
    }
    const deletedAddress = await deleteCustomerAddress(
      request.params.address_id,
      {
        routeId: request.currentRoute.id
      }
    );
    response.status(OK);
    return response.json({
      data: deletedAddress
    });
  } catch (e) {
    response.status(INTERNAL_SERVER_ERROR);
    return response.json({
      error: {
        status: INTERNAL_SERVER_ERROR,
        message: e.message
      }
    });
  }
};
