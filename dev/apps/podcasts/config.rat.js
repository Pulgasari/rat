// config.rat.js

import config from './../zugriff.config.js';
//import { Bool, Ref, Table, UUID } from '@rat/types';

export default {
  ...config,
  id   : 'podcasts',
  name : 'Podcasts',

  // the components of this app first, then the shared ones
  autoImport : ['./components/', '../.shared/components/'],

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
  offline  : true,
};
