// config.rat.js

import config from './../zugriff.config.js';

import { FOLDERS } from '@rat/app/modules/folders.js';

export default {
  ...config,
  name: 'eBooks',

  // the components of this app first, then the shared ones
  autoImport : ['./components/', '../.shared/components/'],

  icons : {
    ...config.icons,
    book           : 'lucide:book',
    'book-alert'   : 'lucide:book-alert',
    'book-open'    : 'lucide:book-open',
    contents       : 'lucide:table-of-contents',
    scroll         : 'lucide:scroll-text',
    'text-larger'  : 'lucide:a-arrow-up',
    'text-smaller' : 'lucide:a-arrow-down',
  },

  database: {
    schema: {
      books    : null,      // key: '<source id>/<path>'
      folders  : FOLDERS,   // the granted folders (@rat/app/modules/folders.js)
      progress : null,      // key: the book key
    },
  },
};
