const { select } = require('@amohajewellery/postgres-query-builder');

module.exports.getAttributeGroupsBaseQuery = () => select().from('attribute_group');
