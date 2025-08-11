import { pool } from '@amohajewellery/amohajewellery/src/lib/postgres/connection.js';
import { buildUrl } from '@amohajewellery/amohajewellery/src/lib/router/buildUrl.js';
import { select } from '@amohajewellery/postgres-query-builder';

export const registerCartItemProductUrlField = (fields) => {
  const newFields = fields.concat([
    {
      key: 'productUrl',
      resolvers: [
        async function resolver() {
          const product = await this.getProduct();
          if (!this.getData('product_id')) {
            return null;
          }
          const urlRewrite = await select()
            .from('url_rewrite')
            .where('entity_uuid', '=', product.uuid)
            .and('entity_type', '=', 'product')
            .load(pool);
          if (!urlRewrite) {
            return buildUrl('productView', {
              uuid: product.uuid
            });
          } else {
            return urlRewrite.request_path;
          }
        }
      ],
      dependencies: ['product_id']
    }
  ]);
  return newFields;
};
