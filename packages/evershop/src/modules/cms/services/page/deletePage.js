import { hookable } from '@amohajewellery/amohajewellery/src/lib/util/hookable.js';
import {
  startTransaction,
  commit,
  rollback,
  select,
  del
} from '@amohajewellery/postgres-query-builder';
import { getConnection } from '@amohajewellery/amohajewellery/src/lib/postgres/connection.js';

async function deletePageData(uuid, connection) {
  await del('cms_page').where('uuid', '=', uuid).execute(connection);
}
/**
 * Delete page service. This service will delete a page with all related data
 * @param {String} uuid
 * @param {Object} context
 */
async function deletePage(uuid, context) {
  const connection = await getConnection();
  await startTransaction(connection);
  try {
    const query = select().from('cms_page');
    query
      .leftJoin('cms_page_description')
      .on(
        'cms_page_description.cms_page_description_cms_page_id',
        '=',
        'cms_page.cms_page_id'
      );

    const page = await query.where('uuid', '=', uuid).load(connection);
    if (!page) {
      throw new Error('Invalid page id');
    }
    await hookable(deletePageData, { ...context, page, connection })(
      uuid,
      connection
    );
    await commit(connection);
    return page;
  } catch (e) {
    await rollback(connection);
    throw e;
  }
}

export default async (uuid, context) => {
  // Make sure the context is either not provided or is an object
  if (context && typeof context !== 'object') {
    throw new Error('Context must be an object');
  }
  const page = await hookable(deletePage, context)(uuid, context);
  return page;
};
