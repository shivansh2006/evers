import { select } from '@amohajewellery/postgres-query-builder';
import { pool } from '@amohajewellery/amohajewellery/src/lib/postgres/connection.js';

let setting;

export async function getSetting(name, defaultValue) {
  if (!setting) {
    setting = await select().from('setting').execute(pool);
  }
  const row = setting.find((s) => s.name === name);
  if (row) {
    return row.value;
  } else {
    return defaultValue;
  }
}

export async function refreshSetting() {
  setting = await select().from('setting').execute(pool);
}
