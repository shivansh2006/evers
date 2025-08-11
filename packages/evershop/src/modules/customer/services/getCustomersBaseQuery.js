const { select } = require('@amohajewellery/postgres-query-builder');

module.exports.getCustomersBaseQuery = () => {
  const query = select().from('customer');

  return query;
};
