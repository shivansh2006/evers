import { buildFilterFromUrl } from '@amohajewellery/amohajewellery/src/lib/util/buildFilterFromUrl.js';
import { setContextValue } from '@amohajewellery/amohajewellery/src/modules/graphql/services/contextHelper.js';

export default (request, response, delegate, next) => {
  setContextValue(request, 'filtersFromUrl', buildFilterFromUrl(request));
  next();
};
