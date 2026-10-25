// noisy :: config.rat.js

import config      from './../zugriff.config.js';
import { FOLDERS } from '@rat/app/modules/folders.js';

export default {
  ...config,
  name : 'noisy',

  autoImport : [
    {'./components/': ['Cover', 'Folders', 'Menu', 'Panel', 'Player']}, 
    '../.shared/components/'
  ],

  mods : {
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
  },
};
