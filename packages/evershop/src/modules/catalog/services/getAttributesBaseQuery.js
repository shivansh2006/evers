const { select } = require('@amohajewellery/postgres-query-builder');

module.exports.getAttributesBaseQuery = () => select().from('attribute');
