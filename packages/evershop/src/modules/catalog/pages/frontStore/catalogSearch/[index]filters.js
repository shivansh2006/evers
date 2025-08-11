const {
  buildFilterFromUrl
} = require('@amohajewellery/amohajewellery/src/lib/util/buildFilterFromUrl');
const {
  setContextValue
} = require('@amohajewellery/amohajewellery/src/modules/graphql/services/contextHelper');

module.exports = (request, response, delegate, next) => {
  setContextValue(request, 'filtersFromUrl', buildFilterFromUrl(request));
  next();
};
