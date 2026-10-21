// config.rat.js

import config from './../zugriff.config.js';

export default {
  ...config,
  name: 'Podcasts',
  plugins: {
    database: { // via @rat/bunker
      schema: {}, // die tabellen: name -> felder
    },
  },
};
