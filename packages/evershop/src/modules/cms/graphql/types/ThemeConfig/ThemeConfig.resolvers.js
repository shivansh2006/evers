const { getConfig } = require('@amohajewellery/amohajewellery/src/lib/util/getConfig');

module.exports = {
  Query: {
    themeConfig: () => getConfig('themeConfig')
  }
};
