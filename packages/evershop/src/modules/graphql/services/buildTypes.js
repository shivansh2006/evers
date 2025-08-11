import path from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { CONSTANTS } from '@amohajewellery/amohajewellery/src/lib/helpers.js';
import { getEnabledExtensions } from '@amohajewellery/amohajewellery/bin/extension/index.js';

export function buildTypeDefs(isAdmin = false) {
  const typeSources = [
    path.join(CONSTANTS.MOLDULESPATH, '*/graphql/types/**/*.graphql')
  ];

  const extensions = getEnabledExtensions();
  extensions.forEach((extension) => {
    typeSources.push(path.join(extension.path, 'graphql/types/**/*.graphql'));
  });
  const typeDefs = mergeTypeDefs(
    typeSources.map((source) =>
      loadFilesSync(source, {
        ignoredExtensions: isAdmin ? [] : ['.admin.graphql']
      })
    )
  );

  return typeDefs;
}
