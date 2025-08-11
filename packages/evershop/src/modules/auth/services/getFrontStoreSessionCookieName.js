const { getConfig } = require('@amohajewellery/amohajewellery/src/lib/util/getConfig');

module.exports.getFrontStoreSessionCookieName = () =>
  getConfig('system.session.cookieName', 'sid');
