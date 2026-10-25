// icons :: config.rat.js

import { Id } from '@rat/types';

export default {
  name     : 'icons',

  // the elements of @aufbau the app uses, defined before its code runs (no autoloader: a build takes these and no others)
  import : [
    '@aufbau/elements/webcomponents/input/tags.js',
    '@aufbau/elements/webcomponents/app-panel.js',
    '@aufbau/elements/webcomponents/btn-icon.js',
    '@aufbau/elements/webcomponents/btn-push.js',
    '@aufbau/elements/webcomponents/btn-tap.js',
    '@aufbau/elements/webcomponents/input-option.js',
    '@aufbau/elements/webcomponents/pop-toast.js',
    '@aufbau/elements/webcomponents/svg-icon.js',
  ],

  // the icons the user hearted, by name ('mdi:home')
  database : { schema: { favs: { name: Id } } },
  hotkeys  : {
    'ctrl+k|/' : 'go[search]',
    'ctrl+1'   : 'go[/]',
    'ctrl+2'   : 'go[sets]',
    'ctrl+3'   : 'go[favs]',
    'escape'   : 'up',
  },
  offline  : true,

  build : { emptyOutDir: true, outDir: '../../../apps/icons' },   // rat build -> apps/icons
};
