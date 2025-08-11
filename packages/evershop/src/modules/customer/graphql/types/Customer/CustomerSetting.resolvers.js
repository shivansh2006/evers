import { getConfig } from '@amohajewellery/amohajewellery/src/lib/util/getConfig.js';

export default {
  Setting: {
    customerAddressSchema: () => getConfig('customer.addressSchema', undefined)
  }
};
