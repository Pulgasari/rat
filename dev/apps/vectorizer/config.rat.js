// vectorizer :: config.rat.js

import config from './../zugriff.config.js';

export default {
  ...config,
  name : 'vectorizer',

  build : { emptyOutDir: true, outDir: '../../../apps/vectorizer' },   // rat build -> apps/vectorizer
};
