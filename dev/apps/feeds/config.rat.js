// config.rat.js

import config from './../zugriff.config.js';

export default {
  ...config,
  id   : 'feeds',
  name : 'Feeds',

  // the components of this app first, then the shared ones
  autoImport : ['./components/', '../.shared/components/'],

  icons : {
    ...config.icons,
    latest     : 'lucide:newspaper',
    'read-all' : 'lucide:check-check',
  },

  database: {
    schema: {
      feeds : null,   // key: id, one record per subscribed feed
      items : null,   // key: '<feed id>\n<guid>', every entry ever seen
      read  : null,   // key: an item key, the ones opened
    },
  },
};
