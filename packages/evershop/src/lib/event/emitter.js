import { insert } from '@amohajewellery/postgres-query-builder';
import { pool } from '@amohajewellery/amohajewellery/src/lib/postgres/connection.js';

export async function emit(name, data) {
  await insert('event')
    .given({
      name,
      data
    })
    .execute(pool);
}
