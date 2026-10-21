// config.rat.js

import config from './../zugriff.config.js';
import { Bool, Ref, Table } from '@rat/types';

export default {
  ...config,
  id   : 'podcasts',
  name : 'Podcasts',
  
  mods: {
    database :{
      schema :{
        'podcasts' : Table( id: UUID ),
        'episodes' : Table( id: UUID, fav: Bool (false), progress: Time (0) ),
      }
    },
    importeur: [ './../.shared/components/' ],
    offline  : true,
  },
};
