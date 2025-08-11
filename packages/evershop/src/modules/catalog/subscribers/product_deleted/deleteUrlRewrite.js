import { pool } from '@amohajewellery/amohajewellery/src/lib/postgres/connection.js';
import { execute } from '@amohajewellery/postgres-query-builder';

export default async function buildUrlReWrite(data) {
  const productUuid = data.uuid;

  // Delete the url rewrite for the product
  await execute(
    pool,
    `DELETE FROM url_rewrite WHERE entity_uuid = '${productUuid}' AND entity_type = 'product'`
  );
}
