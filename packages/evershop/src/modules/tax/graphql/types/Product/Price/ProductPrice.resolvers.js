import { toPrice } from '@amohajewellery/amohajewellery/src/modules/checkout/services/toPrice.js';

export default {
  Product: {
    price: async (product) => {
      const price = toPrice(product.price);
      return {
        regular: price,
        special: price // TODO: implement special price
      };
    }
  }
};
