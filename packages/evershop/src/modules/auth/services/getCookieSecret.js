const { getConfig } = require('@amohajewellery/amohajewellery/src/lib/util/getConfig');

module.exports.getCookieSecret = () => getConfig('system.session.cookieSecret', 'keyboard cat');
