import { buildUrl } from '@amohajewellery/amohajewellery/src/lib/router/buildUrl.js';
import { OK } from '@amohajewellery/amohajewellery/src/lib/util/httpStatus.js';

// eslint-disable-next-line no-unused-vars
export default async (request, response, delegate, next) => {
  const coupon = await delegate.createCoupon;
  response.status(OK);
  response.json({
    data: {
      ...coupon,
      links: [
        {
          rel: 'couponGrid',
          href: buildUrl('couponGrid'),
          action: 'GET',
          types: ['text/xml']
        },
        {
          rel: 'edit',
          href: buildUrl('couponEdit', { id: coupon.uuid }),
          action: 'GET',
          types: ['text/xml']
        }
      ]
    }
  });
};
