import { buildUrl } from '@amohajewellery/amohajewellery/src/lib/router/buildUrl.js';
import { OK } from '@amohajewellery/amohajewellery/src/lib/util/httpStatus.js';

// eslint-disable-next-line no-unused-vars
export default async (request, response, delegate, next) => {
  const page = await delegate.createPage;
  response.status(OK);
  response.json({
    data: {
      ...page,
      links: [
        {
          rel: 'cmsPageGrid',
          href: buildUrl('cmsPageGrid'),
          action: 'GET',
          types: ['text/xml']
        },
        {
          rel: 'edit',
          href: buildUrl('cmsPageEdit', { id: page.uuid }),
          action: 'GET',
          types: ['text/xml']
        },
        {
          rel: 'view',
          href: buildUrl('cmsPageView', { url_key: page.url_key }),
          action: 'GET',
          types: ['text/xml']
        }
      ]
    }
  });
};
