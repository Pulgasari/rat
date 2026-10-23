// config.rat.js

import config from './../zugriff.config.js';
//import { Bool, Ref, Table, UUID } from '@rat/types';

export default {
  ...config,
  id   : 'podcasts',
  name : 'Podcasts',

  // the components of this app first, then the shared ones
  autoImport : ['./components/', '../.shared/components/'],
  
  mods: {
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
  },
};
