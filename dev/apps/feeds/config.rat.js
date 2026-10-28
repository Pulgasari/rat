// config.rat.js

import config from './../zugriff.config.js';

export default {
  ...config,
  id   : 'feeds',
  name : 'Feeds',

  // the elements of @aufbau the app uses, defined before its code runs (no autoloader: a build takes these and no others)
  import : [
    '@aufbau/elements/webcomponents/input/tags.js',
    '@aufbau/elements/webcomponents/btn-icon.js',
    '@aufbau/elements/webcomponents/btn-push.js',
    '@aufbau/elements/webcomponents/input-option.js',
    '@aufbau/elements/webcomponents/pop-toast.js',
    '@aufbau/elements/webcomponents/svg-icon.js',
  ],

  // the components of this app first, then the shared ones
  autoImport : ['./components/', './views/', '../.shared/components/'],

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
  dialogs : true,   // adding a feed, unfollowing one
  offline : true,

  build : { emptyOutDir: true, outDir: '../../../apps/feeds' },   // rat build -> apps/feeds
};
