const { getConfig } = require('@amohajewellery/amohajewellery/src/lib/util/getConfig');

module.exports = {
  Setting: {
    showShippingNote: () => getConfig('checkout.showShippingNote', true)
  }
};
