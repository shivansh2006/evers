const { getConfig } = require('@amohajewellery/amohajewellery/src/lib/util/getConfig');

module.exports = {
  Setting: {
    priceIncludingTax: () => getConfig('pricing.tax.price_including_tax', false)
  }
};
