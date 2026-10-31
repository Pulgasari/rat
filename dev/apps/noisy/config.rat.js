// noisy :: config.rat.js

import config      from './../zugriff.config.js';
import { FOLDERS } from '@rat/app/modules/folders.js';

export default {
  ...config,
  name : 'noisy',

  // the elements of @aufbau the app uses, defined before its code runs
  // (no autoloader: a build takes these and no others)
  import : [
    '@aufbau/elements/webcomponents/input/tags.js',
    '@aufbau/elements/webcomponents/btn-icon.js',
    '@aufbau/elements/webcomponents/btn-push.js',
    '@aufbau/elements/webcomponents/data-index.js',
    '@aufbau/elements/webcomponents/data-item.js',
    '@aufbau/elements/webcomponents/input-option.js',
    '@aufbau/elements/webcomponents/pop-toast.js',
    '@aufbau/elements/webcomponents/svg-icon.js',
  ],

  autoImport : [
    {'./components/': ['Cover', 'Folders', 'Menu', 'Panel', 'Player']}, 
    '../.shared/components/'
  ],

  database   : { schema: { folders: FOLDERS, tracks: null } },   // tracks, key: '<source id>/<path>'
  folders    : { accept: 'aac, flac, m4a, mp3, oga, ogg, opus, wav, weba, webm' },
  hotkeys    : {
    'space'       : 'toggle-play',
    'arrow-left'  : 'previous',
    'arrow-right' : 'next',
    'escape'      : 'clear-selection',
  },
  offline    : true,
  thumbnails : { width: 160 }, // the covers, from the tags

  // rat build --target android. the media session plugin: the notification, the lock screen, playing on in the background
  android : { id: 'dev.pulgasari.noisy', npm: ['@jofr/capacitor-media-session'] },

  build : { 
    emptyOutDir : true, 
    outDir      : '../../../apps/noisy'
  }, // rat build -> apps/noisy
};
