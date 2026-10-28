// videos :: config.rat.js

import { FOLDERS } from '@rat/app/modules/folders.js';

import config from './../zugriff.config.js';

export default {
  ...config,
  name : 'Videos',

  // the elements of @aufbau the app uses, defined before its code runs (no autoloader: a build takes these and no others)
  import : [
    '@aufbau/elements/webcomponents/input/tags.js',
    '@aufbau/elements/webcomponents/btn-icon.js',
    '@aufbau/elements/webcomponents/btn-push.js',
    '@aufbau/elements/webcomponents/btn-tap.js',
    '@aufbau/elements/webcomponents/input-option.js',
    '@aufbau/elements/webcomponents/pop-toast.js',
    '@aufbau/elements/webcomponents/svg-icon.js',
  ],

  autoImport : ['./components/', '../.shared/components/'],

  database   : { schema: { clips: null, folders: FOLDERS } },   // clips, key: '<source id>/<path>'
  folders    : { accept: '3gp, avi, flv, m4v, mkv, mov, mp4, mpeg, mpg, ogg, ogv, ts, webm, wmv' },
  offline    : true,
  thumbnails : { width: 320 },   // the posters, one frame of each clip

  hotkeys : {
    'space'       : 'toggle-play',
    'arrow-left'  : 'back-10',
    'arrow-right' : 'forward-10',
  },

  icons : {
    ...config.icons,
    aspect          : 'lucide:ratio',
    crop            : 'lucide:crop',
    'forward-10'    : 'mdi:fast-forward-10',
    'frame-back'    : 'lucide:step-back',
    'frame-forward' : 'lucide:step-forward',
    folders         : 'lucide:folders',
    mirror          : 'lucide:flip-horizontal-2',
    mute            : 'lucide:volume-x',
    repeat          : 'lucide:repeat',
    'repeat-off'    : 'mdi:repeat-off',
    reverse         : 'lucide:rewind',
    'rewind-10'     : 'mdi:rewind-10',
    rotate          : 'lucide:rotate-cw',
    search          : 'lucide:search',
    speed           : 'lucide:gauge',
  },

  build : { emptyOutDir: true, outDir: '../../../apps/videos' },   // rat build -> apps/videos
};
