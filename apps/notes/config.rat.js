// config.rat.js

/*
- die runtime bzw <app-rat> nimmt 'config.rat.js' es sei denn andere file wurde definiert
- entweder default export oder mehrere top-level exports
- ist dann am globalen `rat` verfügbar: `rat.config`
*/

import config from './../zugriff.config.js';

export default {
  ...config,
  name: 'Notes',
  plugins: {
    folders: { accept: 'md, markdown, mdown, mkd, mdwn, mdtxt' },
  },
};
