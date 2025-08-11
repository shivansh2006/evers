import { resolve } from 'path';
import chokidar from 'chokidar';
import { CONSTANTS } from '../../../src/lib/helpers.js';
import { broadcash } from './broadcash.js';

function refreshable() {
  const watcher = chokidar.watch('./packages/amohajewellery/src/lib/response/*', {
    ignored: /node_modules[\\/]/,
    ignoreInitial: true,
    persistent: true
  });
  watcher.add('./packages/amohajewellery/src/lib/util/*');
  watcher.on('all', (event, path) => {
    delete require.cache[require.resolve(resolve(CONSTANTS.ROOTPATH, path))];
    broadcash();
  });
}

module.exports.refreshable = refreshable;
