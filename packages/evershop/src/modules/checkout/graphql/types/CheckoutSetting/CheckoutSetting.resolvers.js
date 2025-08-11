import { getConfig } from '@amohajewellery/amohajewellery/src/lib/util/getConfig.js';

export default {
  Setting: {
    showShippingNote: () => getConfig('checkout.showShippingNote', true)
  }
};
