// config.rat.js

import config from './../zugriff.config.js';

export default {
  ...config,
  name: 'Podcasts',
  mods: {
    database: { // via @rat/bunker
      schema: {}, // die tabellen: name -> felder
    },
  },
};
