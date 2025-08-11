import { getConfig } from '@amohajewellery/amohajewellery/src/lib/util/getConfig.js';
import { getSetting } from '../../../setting/services/setting.js';

// eslint-disable-next-line no-unused-vars
export default async (request, response) => {
  // Check if Stripe is enabled
  const stripeConfig = getConfig('system.stripe', {});
  let stripeStatus;
  if (stripeConfig.status) {
    stripeStatus = stripeConfig.status;
  } else {
    stripeStatus = await getSetting('stripePaymentStatus', 0);
  }
  if (parseInt(stripeStatus, 10) === 1) {
    return {
      methodCode: 'stripe',
      methodName: await getSetting('stripeDislayName', 'Stripe')
    };
  } else {
    return null;
  }
};
