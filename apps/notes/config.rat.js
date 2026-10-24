// config.rat.js

/*
- die runtime bzw <rat-app> nimmt 'config.rat.js' es sei denn andere file wurde definiert
- entweder default export oder mehrere top-level exports
- ist dann am globalen `rat` verfügbar: `rat.config`

<rat-app> lädt sie selbst (app.config, RAT.config)
*/

import config from './../zugriff.config.js';

import { FOLDERS } from '@rat/app/modules/folders.js';

export default {
  ...config,
  name: 'Notes',
  // the folders hold markdown, their handles are kept in the database (@rat/app/modules/folders.js)
  folders: { accept: 'md, markdown, mdown, mkd, mdwn, mdtxt' },
  mods: {
    database : { schema: { folders: FOLDERS } },
    offline  : true,
  },
};
