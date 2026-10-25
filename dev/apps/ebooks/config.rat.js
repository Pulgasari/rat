// config.rat.js

import config from './../zugriff.config.js';

import { FOLDERS } from '@rat/app/modules/folders.js';

export default {
  ...config,
  name: 'eBooks',

  // the components of this app first, then the shared ones
  autoImport : ['./components/', '../.shared/components/'],

  database: {
    schema: {
      books    : null,      // key: '<source id>/<path>'
      folders  : FOLDERS,   // the granted folders (@rat/app/modules/folders.js)
      progress : null,      // key: the book key
    },
  },
};
