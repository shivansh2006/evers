import { getConfig } from '@amohajewellery/amohajewellery/src/lib/util/getConfig.js';

export default {
  Query: {
    carriers: () => {
      const carriers = getConfig('oms.carriers', {});
      return Object.keys(carriers).map((key) => ({
        ...carriers[key],
        code: key
      }));
    }
  }
};
