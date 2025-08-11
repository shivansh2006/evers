/* eslint-disable no-underscore-dangle */
import path from 'path';
import { fileURLToPath } from 'url';
import { getConfig } from './util/getConfig.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootPath = process.cwd();

export const CONSTANTS = Object.freeze({
  ROOTPATH: rootPath,
  LIBPATH: path.resolve(__dirname),
  MOLDULESPATH: path.resolve(__dirname, '..', 'modules'),
  PUBLICPATH: path.resolve(rootPath, 'public'),
  MEDIAPATH: path.resolve(rootPath, 'media'),
  NODEMODULEPATH: path.resolve(rootPath, 'node_modules'),
  THEMEPATH: path.resolve(rootPath, 'themes'),
  CACHEPATH: path.resolve(rootPath, '.amohajewellery'),
  BUILDPATH: path.resolve(rootPath, '.amohajewellery', 'build'),
  ADMIN_COLLECTION_SIZE: getConfig('admin_collection_size', 20)
});
