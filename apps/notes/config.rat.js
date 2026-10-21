// config.rat.js

/*
- die runtime bzw <rat-app> nimmt 'config.rat.js' es sei denn andere file wurde definiert
- entweder default export oder mehrere top-level exports
- ist dann am globalen `rat` verfügbar: `rat.config`

<rat-app> lädt sie selbst (app.config, mit RAT: true auch RAT.config)
*/

import config from './../zugriff.config.js';

export default {
  ...config,
  name: 'Notes',
  // the folders hold markdown (FolderLibrary, until notes runs on @rat/bunker's Files)
  folders: { accept: 'md, markdown, mdown, mkd, mdwn, mdtxt' },
};
