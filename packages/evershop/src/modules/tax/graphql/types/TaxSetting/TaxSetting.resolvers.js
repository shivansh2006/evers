import { getConfig } from '@amohajewellery/amohajewellery/src/lib/util/getConfig.js';

export default {
  Setting: {
    priceIncludingTax: () => getConfig('pricing.tax.price_including_tax', false)
  }
};
