import { translate } from '@amohajewellery/amohajewellery/src/lib/locale/translate/translate.js';
import { get } from '@amohajewellery/amohajewellery/src/lib/util/get.js';
import { setContextValue } from '@amohajewellery/amohajewellery/src/modules/graphql/services/contextHelper.js';

export default (request, response, delegate, next) => {
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
