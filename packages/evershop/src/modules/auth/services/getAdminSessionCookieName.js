import { getConfig } from '@amohajewellery/amohajewellery/src/lib/util/getConfig.js';

export const getAdminSessionCookieName = () =>
  getConfig('system.session.adminCookieName', 'asid');
