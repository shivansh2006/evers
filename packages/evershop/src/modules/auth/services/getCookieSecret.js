import { getConfig } from '@amohajewellery/amohajewellery/src/lib/util/getConfig.js';

export const getCookieSecret = () =>
  getConfig('system.session.cookieSecret', 'keyboard cat');
