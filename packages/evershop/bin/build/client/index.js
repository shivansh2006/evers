const webpack = require('webpack');
const {
  createConfigClient
} = require('@amohajewellery/amohajewellery/src/lib/webpack/prod/createConfigClient');
const { error } = require('@amohajewellery/amohajewellery/src/lib/log/debuger');

module.exports.buildClient = async function buildClient(routes) {
  const config = createConfigClient(routes);
  const compiler = webpack(config);

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err || stats.hasErrors()) {
        error(
          stats.toString({
            errorDetails: true,
            warnings: true
          })
        );
        reject(err);
      }
      resolve(stats);
    });
  });
};
