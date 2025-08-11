import path from 'path';
import fs from 'fs/promises';
import { existsSync } from 'fs';
import { CONSTANTS } from '@amohajewellery/amohajewellery/src/lib/helpers.js';
import { getConfig } from '@amohajewellery/amohajewellery/src/lib/util/getConfig.js';
import { getValueSync } from '@amohajewellery/amohajewellery/src/lib/util/registry.js';

/**
 * @param {String} destinationPath the destination path
 */
export const createFolder = async (destinationPath) => {
  /**
   * @type {Object} uploader
   * @property {Function} create
   */
  const folderCreator = getValueSync(
    'folderCreator',
    localFolderCreator,
    {
      config: getConfig('system.file_storage')
    },
    (value) =>
      // The value must be an object with an create method
      value && typeof value.create === 'function'
  );

  const results = await folderCreator.create(destinationPath);
  return results;
};

const localFolderCreator = {
  create: async (destinationPath) => {
    const mediaPath = CONSTANTS.MEDIAPATH;
    const destination = path.join(mediaPath, destinationPath);
    // Check if the folder already exists
    if (!existsSync(destination)) {
      // Create the destination folder if it does not exist
      await fs.mkdir(destination, { recursive: true });
    }
    return destinationPath;
  }
};
