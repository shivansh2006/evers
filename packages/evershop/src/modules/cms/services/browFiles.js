import { join } from 'path';
import { existsSync, readdirSync } from 'fs';
import { CONSTANTS } from '@amohajewellery/amohajewellery/src/lib/helpers.js';
import { getConfig } from '@amohajewellery/amohajewellery/src/lib/util/getConfig.js';
import { getValueSync } from '@amohajewellery/amohajewellery/src/lib/util/registry.js';
import { buildUrl } from '@amohajewellery/amohajewellery/src/lib/router/buildUrl.js';

/**
 * @param {String} path the file path
 */
export const browFiles = async (path) => {
  /**
   * @type {Object} uploader
   * @property {Function} list
   */
  const fileBrowser = getValueSync(
    'fileBrowser',
    localFileBrowser,
    {
      config: getConfig('system.file_storage')
    },
    (value) =>
      // The value must be an object with an delete method
      value && typeof value.list === 'function'
  );

  const results = await fileBrowser.list(path);
  return results;
};

const localFileBrowser = {
  list: async (path) => {
    const targetPath = join(CONSTANTS.MEDIAPATH, path);
    if (!existsSync(targetPath)) {
      throw new Error('Requested path does not exist');
    } else {
      return {
        folders: readdirSync(targetPath, {
          withFileTypes: true
        })
          .filter((dirent) => dirent.isDirectory())
          .map((dirent) => dirent.name),
        files: readdirSync(targetPath, {
          withFileTypes: true
        })
          .filter((dirent) => dirent.isFile())
          .map((f) => ({
            url: buildUrl('staticAsset', [`${path}/${f.name}`]),
            name: f.name
          }))
      };
    }
  }
};
