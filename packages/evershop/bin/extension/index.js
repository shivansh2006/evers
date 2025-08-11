import { existsSync } from 'fs';
import { resolve } from 'path';
import { CONSTANTS } from '@amohajewellery/amohajewellery/src/lib/helpers.js';
import { getConfig } from '@amohajewellery/amohajewellery/src/lib/util/getConfig.js';
import { getCoreModules } from '@amohajewellery/amohajewellery/bin/lib/loadModules.js';
import { warning } from '@amohajewellery/amohajewellery/src/lib/log/logger.js';

let extensions;

function loadExtensions() {
  const coreModules = getCoreModules();
  const list = getConfig('system.extensions', []);
  const extensions = [];
  list.forEach((extension) => {
    if (
      coreModules.find((module) => module.name === extension.name) ||
      extensions.find((e) => e.name === extension.name)
    ) {
      throw new Error(
        `Extension ${extension.name} is invalid. extension name must be unique.`
      );
    }
    if (
      extension.enabled === true &&
      existsSync(resolve(CONSTANTS.ROOTPATH, extension.resolve))
    ) {
      extensions.push({
        ...extension,
        path: resolve(CONSTANTS.ROOTPATH, extension.resolve)
      });
    } else {
      warning(
        `Extension ${extension.name} is either disabled or the path is not existed.`
      );
    }
  });

  // Sort the extensions by priority, smaller number means higher priority
  extensions.sort((a, b) => a.priority - b.priority);

  return extensions;
}

export function getEnabledExtensions() {
  if (extensions === undefined) {
    extensions = loadExtensions();
  }
  return extensions;
}
