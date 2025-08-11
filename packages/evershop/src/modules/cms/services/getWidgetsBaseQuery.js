const { select } = require('@amohajewellery/postgres-query-builder');

module.exports.getWidgetsBaseQuery = () => {
  const query = select().from('widget');

  return query;
};
