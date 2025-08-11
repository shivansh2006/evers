const packageJson = require('@amohajewellery/amohajewellery/package.json');

module.exports = {
  Query: {
    version: () => packageJson.version
  }
};
