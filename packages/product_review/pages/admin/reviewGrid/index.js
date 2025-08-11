const {
  buildFilterFromUrl
} = require('@amohajewellery/amohajewellery/src/lib/util/buildFilterFromUrl');
const {
  setContextValue
} = require('@amohajewellery/amohajewellery/src/modules/graphql/services/contextHelper');

module.exports = (request, response) => {
  setContextValue(request, 'pageInfo', {
    title: 'Reviews',
    description: 'Reviews'
  });
  setContextValue(request, 'filtersFromUrl', buildFilterFromUrl(request));
};
