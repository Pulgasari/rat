// looksmaxx :: config.rat.js

import config from './../zugriff.config.js';

export default {
  ...config,
  name : 'looksmaxx',

  // the elements of @aufbau the app uses, defined before its code runs (no autoloader: a build takes these and no others)
  import : [
    '@aufbau/elements/webcomponents/btn-icon.js',
    '@aufbau/elements/webcomponents/pop-toast.js',
    '@aufbau/elements/webcomponents/svg-icon.js',
  ],

  autoImport : ['./components/', '../.shared/components/'],

  offline : true,

  icons : {
    ...config.icons,
    'image-add'     : 'lucide:image-plus',
    'image-refresh' : 'lucide:image-up',
    none            : 'lucide:ban',
    pipette         : 'lucide:pipette',
    reset           : 'lucide:rotate-ccw',
  },

  build : { emptyOutDir: true, outDir: '../../../apps/looksmaxx' },   // rat build -> apps/looksmaxx
};
