const {
  translate
} = require('@amohajewellery/amohajewellery/src/lib/locale/translate/translate');
const { get } = require('@amohajewellery/amohajewellery/src/lib/util/get');
const {
  setContextValue
} = require('@amohajewellery/amohajewellery/src/modules/graphql/services/contextHelper');

module.exports = (request, response, delegate, next) => {
  // Get the keyword from the request query
  const keyword = get(request, 'query.keyword');
  if (!keyword) {
    // Redirect to the home page if no keyword is not provided
    response.redirect('/');
  } else {
    setContextValue(request, 'pageInfo', {
      title: translate('Search results for: ${keyword}', { keyword }),
      description: translate('Search results for: ${keyword}', { keyword }),
      url: request.url
    });
    next();
  }
};
