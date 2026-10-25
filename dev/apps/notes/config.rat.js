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

  // the elements of @aufbau the app uses, defined before its code runs (no autoloader: a build takes these and no others)
  import : [
    '@aufbau/elements/webcomponents/input/tags.js',
    '@aufbau/elements/webcomponents/btn-icon.js',
    '@aufbau/elements/webcomponents/btn-push.js',
    '@aufbau/elements/webcomponents/btn-tap.js',
    '@aufbau/elements/webcomponents/data-node.js',
    '@aufbau/elements/webcomponents/data-tree.js',
    '@aufbau/elements/webcomponents/input-option.js',
    '@aufbau/elements/webcomponents/nav-crumbs.js',
    '@aufbau/elements/webcomponents/nav-toc.js',
    '@aufbau/elements/webcomponents/output-md.js',
    '@aufbau/elements/webcomponents/pop-toast.js',
    '@aufbau/elements/webcomponents/svg-icon.js',
  ],

  // the folders hold markdown, their handles are kept in the database (@rat/app/modules/folders.js): the database first
  database : { schema: { folders: FOLDERS } },
  folders  : { accept: 'md, markdown, mdown, mkd, mdwn, mdtxt', id: 'notes' },
  offline  : true,

  build : { emptyOutDir: true, outDir: '../../../apps/notes' },   // rat build -> apps/notes
};
