import { loadCsv } from '@amohajewellery/amohajewellery/src/lib/locale/translate/translate.js';
import { merge } from '@amohajewellery/amohajewellery/src/lib/util/merge.js';
import { addProcessor } from '@amohajewellery/amohajewellery/src/lib/util/registry.js';

export default async () => {
  await loadCsv();
  addProcessor('configuratonSchema', (schema) => {
    merge(schema, {
      properties: {
        shop: {
          type: 'object',
          properties: {
            homeUrl: {
              type: 'string',
              format: 'uri'
            },
            weightUnit: {
              type: 'string'
            },
            currency: {
              type: 'string'
            },
            language: {
              type: 'string'
            },
            timezone: {
              type: 'string'
            }
          }
        },
        system: {
          type: 'object',
          properties: {
            extensions: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string'
                  },
                  resolve: {
                    type: 'string'
                  },
                  enabled: {
                    type: 'boolean'
                  },
                  priority: {
                    type: 'number'
                  }
                },
                required: ['name', 'enabled', 'resolve']
              }
            },
            jobs: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string'
                  },
                  resolve: {
                    type: 'string'
                  },
                  enabled: {
                    type: 'boolean'
                  },
                  schedule: {
                    type: 'string'
                  }
                },
                required: ['name', 'enabled', 'resolve', 'schedule']
              }
            },
            theme: {
              type: 'string'
            },
            session: {
              type: 'object',
              properties: {
                cookieSecret: {
                  type: 'string'
                },
                cookieName: {
                  type: 'string'
                },
                maxAge: {
                  type: 'number'
                },
                reSave: {
                  type: 'boolean'
                },
                saveUninitialized: {
                  type: 'boolean'
                }
              }
            }
          }
        }
      }
    });
    return schema;
  });
};
