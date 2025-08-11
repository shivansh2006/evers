const { getConfig } = require('@amohajewellery/amohajewellery/src/lib/util/getConfig');

module.exports.getAdminSessionCookieName = () =>
  getConfig('system.session.adminCookieName', 'asid');
