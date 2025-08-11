const { getConfig } = require('@amohajewellery/amohajewellery/src/lib/util/getConfig');

module.exports = {
  Setting: {
    customerAddressSchema: () => getConfig('customer.addressSchema', undefined)
  }
};
