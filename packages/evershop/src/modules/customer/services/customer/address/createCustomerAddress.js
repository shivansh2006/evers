import {
  commit,
  insert,
  rollback,
  select,
  startTransaction,
  update
} from '@amohajewellery/postgres-query-builder';
import { getConnection, pool } from '../../../../../lib/postgres/connection.js';
import { hookable } from '../../../../../lib/util/hookable.js';
import { getValue } from '../../../../../lib/util/registry.js';
import { validateAddress } from './addressValidator.js';

async function insertCustomerAddressData(data, connection) {
  const address = await insert('customer_address')
    .given(data)
    .execute(connection);
  if (address.is_default) {
    await update('customer_address')
      .given({
        is_default: 0
      })
      .where('customer_id', '=', address.customer_id)
      .and('uuid', '<>', address.uuid)
      .execute(connection);
  }
  return address;
}

/**
 * Create customer address service. This service will create a customer address with all related data
 * @param {Object} data
 * @param {Object} context
 */
async function createCustomerAddress(customerUUID, address, context) {
  const connection = await getConnection();
  await startTransaction(connection);
  try {
    const customerAddressData = await getValue(
      'customerAddressDataBeforeCreate',
      address,
      context
    );
    // Validate customer address data
    validateAddress(customerAddressData);
    const customer = await select()
      .from('customer')
      .where('uuid', '=', customerUUID)
      .load(pool);

    if (!customer) {
      throw new Error('Invalid customer');
    }
    customerAddressData.customer_id = customer.customer_id;
    // Insert customer address data
    const customerAddress = await hookable(insertCustomerAddressData, {
      ...context,
      connection
    })(customerAddressData, connection);

    await commit(connection);
    return customerAddress;
  } catch (e) {
    await rollback(connection);
    throw e;
  }
}

export default async (customerUUID, addressData, context) => {
  // Make sure the context is either not provided or is an object
  if (context && typeof context !== 'object') {
    throw new Error('Context must be an object');
  }
  const address = await hookable(createCustomerAddress, context)(
    customerUUID,
    addressData,
    context
  );
  return address;
};
