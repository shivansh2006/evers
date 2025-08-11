const { normalize, resolve } = require('path');
const { CONSTANTS } = require('@amohajewellery/amohajewellery/src/lib/helpers');
const { info } = require('@amohajewellery/amohajewellery/src/lib/log/logger');
const { broadcash } = require('./broadcash');

module.exports.watchSchema = function (event, path) {
  // Check if path include graphql/types
  if (!path.includes(normalize('graphql/types'))) {
    return;
  }
  if (event === 'change') {
    info(`Updating ${path}`);
    delete require.cache[require.resolve(path)];
  }
  info('Cleaning require cache');
  // Delete buildSchema.js cache
  delete require.cache[
    require.resolve(
      resolve(CONSTANTS.MOLDULESPATH, 'graphql/services/buildSchema')
    )
  ];
  require(resolve(CONSTANTS.MOLDULESPATH, 'graphql/services/buildSchema'));
  broadcash();
};
