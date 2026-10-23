// icons :: config.rat.js

import { Id } from '@rat/types';

export default {
  name    : 'icons',
  mods    : {
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
  },
};
