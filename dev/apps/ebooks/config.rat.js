// config.rat.js

import config from './../zugriff.config.js';

import { FOLDERS } from '@rat/app/modules/folders.js';

export default {
  ...config,
  name: 'eBooks',

  // the elements of @aufbau the app uses, defined before its code runs (no autoloader: a build takes these and no others)
  import : [
    '@aufbau/elements/webcomponents/input/tags.js',
    '@aufbau/elements/webcomponents/aufbau-progress.js',
    '@aufbau/elements/webcomponents/btn-icon.js',
    '@aufbau/elements/webcomponents/btn-push.js',
    '@aufbau/elements/webcomponents/btn-tap.js',
    '@aufbau/elements/webcomponents/data-index.js',
    '@aufbau/elements/webcomponents/data-item.js',
    '@aufbau/elements/webcomponents/data-node.js',
    '@aufbau/elements/webcomponents/data-tree.js',
    '@aufbau/elements/webcomponents/input-option.js',
    '@aufbau/elements/webcomponents/pop-toast.js',
    '@aufbau/elements/webcomponents/svg-icon.js',
  ],

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

  build : { emptyOutDir: true, outDir: '../../../apps/ebooks' },   // rat build -> apps/ebooks
};
