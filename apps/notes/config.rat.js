// config.rat.js

/*
- die runtime bzw <rat-app> nimmt 'config.rat.js' es sei denn andere file wurde definiert
- entweder default export oder mehrere top-level exports
- ist dann am globalen `rat` verfügbar: `rat.config`

(vorerst: ein normaler import in app.rat, siehe ../README.md)
*/

import config from './../zugriff.config.js';

export default {
  ...config,
  name: 'Notes',
  plugins: {
    folders: { accept: 'md, markdown, mdown, mkd, mdwn, mdtxt' },
  },
};
