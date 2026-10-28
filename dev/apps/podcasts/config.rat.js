// config.rat.js

import config from './../zugriff.config.js';
//import { Bool, Ref, Table, UUID } from '@rat/types';

export default {
  ...config,
  id   : 'podcasts',
  name : 'Podcasts',

  // the elements of @aufbau the app uses, defined before its code runs (no autoloader: a build takes these and no others)
  import : [
    '@aufbau/elements/webcomponents/input/tags.js',
    '@aufbau/elements/webcomponents/aufbau-progress.js',
    '@aufbau/elements/webcomponents/btn-icon.js',
    '@aufbau/elements/webcomponents/btn-push.js',
    '@aufbau/elements/webcomponents/btn-tap.js',
    '@aufbau/elements/webcomponents/data-index.js',
    '@aufbau/elements/webcomponents/data-item.js',
    '@aufbau/elements/webcomponents/input-option.js',
    '@aufbau/elements/webcomponents/pop-toast.js',
    '@aufbau/elements/webcomponents/svg-icon.js',
  ],

  // the components of this app first, then the shared ones
  autoImport : ['./components/', './views/', '../.shared/components/'],

  icons : {
    ...config.icons,
    'ahead-30'    : 'mdi:fast-forward-30',   // lucide has no number in its skips
    'back-15'     : 'mdi:rewind-15',
    episodes      : 'lucide:list-music',
    explore       : 'lucide:compass',
    'no-episodes' : 'lucide:list-x',
    played        : 'mdi:check-circle',      // filled against outlined: lucide has no filled ones
    podcast       : 'lucide:podcast',
    unplayed      : 'mdi:check-circle-outline',
  },
  
  database :{
    schema :{
      episodes  : null,   // key: id ('<podcast id>:<hash of guid>')
      podcasts  : null,   // key: id ('p<hash of feed url>')
      progress  : null,   // key: the episode id
      shortlist : null,   // key: the podcast id, explore's 'remember'
    //  'podcasts' : Table ({ id: UUID }),
    //  'episodes' : Table ({ id: UUID, fav: Bool (false), progress: Time (0) }),
    }
  },
  dialogs    : true,
  offline    : true,
  thumbnails : { width: 256 },   // the covers, small copies kept in opfs (Artwork)

  hotkeys : {
    'escape'      : { exec: 'close-dialog' },
    'space'       : { exec: 'toggle-play', preventDefault: true },
    'arrow-left'  : { exec: 'skip-back' },
    'arrow-right' : { exec: 'skip-forward' },
  },

  build : { emptyOutDir: true, outDir: '../../../apps/podcasts' },   // rat build -> apps/podcasts
};
