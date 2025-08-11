const { currencies } = require('@amohajewellery/amohajewellery/src/lib/locale/currencies');

module.exports = {
  Query: {
    currencies: () => currencies
  }
};
