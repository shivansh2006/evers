import { buildUrl } from '@amohajewellery/amohajewellery/src/lib/router/buildUrl.js';
import {
  OK,
  INTERNAL_SERVER_ERROR,
  INVALID_PAYLOAD
} from '@amohajewellery/amohajewellery/src/lib/util/httpStatus.js';
import { pool } from '@amohajewellery/amohajewellery/src/lib/postgres/connection.js';
import { select } from '@amohajewellery/postgres-query-builder';
import updateCustomerAddress from '../../services/customer/address/updateCustomerAddress.js';

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
    const newAddress = await updateCustomerAddress(
      request.params.address_id,
      request.body
    );
    response.status(OK);
    response.$body = {
      data: {
        ...newAddress,
        links: [
          {
            rel: 'edit',
            href: buildUrl('updateCustomerAddress', {
              address_id: address.uuid,
              customer_id: request.params.customer_id
            }),
            action: 'UPDATE',
            types: ['application/json']
          },
          {
            rel: 'delete',
            href: buildUrl('deleteCustomerAddress', {
              address_id: address.uuid,
              customer_id: request.params.customer_id
            }),
            action: 'DELETE',
            types: ['application/json']
          }
        ]
      }
    };
    return next();
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
