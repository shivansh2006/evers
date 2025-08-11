const { buildUrl } = require('@amohajewellery/amohajewellery/src/lib/router/buildUrl');
const { getConfig } = require('@amohajewellery/amohajewellery/src/lib/util/getConfig');
const { getEnv } = require('@amohajewellery/amohajewellery/src/lib/util/getEnv');
const {
  getGoogleAuthUrl
} = require('@amohajewellery/google_login/services/getGoogleAuthUrl');

module.exports = (request, response, delegate, next) => {
  // Check if customer is already logged in
  if (request.isCustomerLoggedIn()) {
    response.redirect('/');
    return;
  }
  const client_id = getEnv('GOOGLE_LOGIN_CLIENT_ID');
  const homeUrl = getConfig('shop.homeUrl', 'http://localhost:3000');
  const redirect_uri = `${homeUrl}${buildUrl('gcallback')}`;
  const googleAuthUrl = getGoogleAuthUrl(client_id, redirect_uri);
  response.redirect(googleAuthUrl);
};
