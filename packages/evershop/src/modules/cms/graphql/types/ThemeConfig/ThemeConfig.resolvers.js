import { getConfig } from '@amohajewellery/amohajewellery/src/lib/util/getConfig.js';

export default {
  Query: {
    themeConfig: () => getConfig('themeConfig')
  }
};
