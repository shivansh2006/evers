const { camelCase } = require('@amohajewellery/amohajewellery/src/lib/util/camelCase');

module.exports = {
  Query: {
    currentCustomer: async (root, args, { customer }) =>
      customer ? camelCase(customer) : null
  }
};
