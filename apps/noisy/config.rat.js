// noisy :: config.rat.js

import config      from './../zugriff.config.js';
import { FOLDERS } from '@rat/app/modules/folders.js';

const AUDIO = 'aac, flac, m4a, mp3, oga, ogg, opus, wav, weba, webm';

export default {
  ...config,
  name : 'noisy',

  // the components of this app first, then the shared ones
  autoImport : ['./components/', '../.shared/components/'],

  mods : {
    database   : { schema: { folders: FOLDERS, tracks: null } },   // tracks, key: '<source id>/<path>'
    folders    : { accept: AUDIO },
    thumbnails : { width: 160 },                                  // the covers, from the tags
    hotkeys    : {
      'space'       : 'toggle-play',
      'arrow-left'  : 'previous',
      'arrow-right' : 'next',
      'escape'      : 'clear-selection',
    },
    offline    : true,
  },
};
