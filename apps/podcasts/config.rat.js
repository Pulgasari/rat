// config.rat.js

import config from './../zugriff.config.js';

export default {
  ...config,
  name: 'Podcasts',
  plugins: {
    database: { // via @bunker/db
      tables: {}, // hier könnte eigtl direkt das schema definiert werden
    },
  },
};
