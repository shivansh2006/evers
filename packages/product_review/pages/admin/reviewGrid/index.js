const {
  buildFilterFromUrl
} = require('@amohajewellery/amohajewellery/src/lib/util/buildFilterFromUrl');
const {
  setContextValue
} = require('@amohajewellery/amohajewellery/src/modules/graphql/services/contextHelper');

// eslint-disable-next-line no-unused-vars
module.exports = (request, response) => {
  setContextValue(request, 'pageInfo', {
    title: 'Reviews',
    description: 'Reviews'
  });
  const { query } = request;
  setContextValue(request, 'filtersFromUrl', buildFilterFromUrl(query));
};
