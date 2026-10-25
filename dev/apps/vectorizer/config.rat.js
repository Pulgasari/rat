// vectorizer :: config.rat.js

import config from './../zugriff.config.js';

export default {
  ...config,
  name : 'vectorizer',

  // the elements of @aufbau the app uses, defined before its code runs (no autoloader: a build takes these and no others)
  import : [
    '@aufbau/elements/webcomponents/btn-push.js',
    '@aufbau/elements/webcomponents/pop-toast.js',
    '@aufbau/elements/webcomponents/svg-icon.js',
  ],

  build : { emptyOutDir: true, outDir: '../../../apps/vectorizer' },   // rat build -> apps/vectorizer
};
