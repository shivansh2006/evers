import { error } from '@amohajewellery/amohajewellery/src/lib/log/logger.js';
import json from '@amohajewellery/amohajewellery/package.json' with { type: 'json' };

export default {
  Query: {
    version: () => {
      try {
        return json.version;
      } catch (e) {
        error(e);
        return 'unknown';
      }
    }
  }
};
