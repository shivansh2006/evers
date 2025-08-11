const { insert } = require('@amohajewellery/postgres-query-builder');
const { pool } = require('@amohajewellery/amohajewellery/src/lib/postgres/connection');

module.exports.emit = async function emit(name, data) {
  await insert('event')
    .given({
      name,
      data
    })
    .execute(pool);
};
