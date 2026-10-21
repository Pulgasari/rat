// config.rat.js

/*
- die runtime bzw <rat-app> nimmt 'config.rat.js' es sei denn andere file wurde definiert
- entweder default export oder mehrere top-level exports
- ist dann am globalen `rat` verfügbar: `rat.config`

<rat-app> lädt sie selbst (app.config, mit RAT: true auch RAT.config)
*/

import config from './../zugriff.config.js';

import { FOLDERS } from '../.shared/folders.js';

export default {
  ...config,
  name: 'Notes',
  // the folders hold markdown, their handles are kept in the database (../.shared/folders.js)
  folders: { accept: 'md, markdown, mdown, mkd, mdwn, mdtxt' },
  mods: {
    database : { schema: { folders: FOLDERS } },
    offline  : true,
  },
};
