// config.rat.js

/*
- die runtime bzw <app-rat> nimmt 'config.rat.js' es sei denn andere file wurde definiert
- entweder default export oder mehrere top-level exports
- ist dann am globalen `rat` verfügbar: `rat.config`
*/

import config from './../zugriff.config.js';

export default {
  ...config,
  name        : 'Notes',
  dir         : 'ltr',
  display     : 'standalone',
  lang        : 'en',
  orientation : 'any',
  viewport    : {
    width        : 'device-width',
    initialScale : 1,
    maxinumScale : 1,
    userScalable : 'no',
    fit          : 'cover',
  },
  aufbau: {
    elements: { mode: 'auto' },
  },
  gestalt: {
    palette: 'zombie',
  },
  plugins: {
    folders: { accept: 'md, markdown, mdown, mkd, mdwn, mdtxt' },
  },
  settings : {
    dir  : Enum({ values: ['ltr', 'rtl'], element: { look: 'segments' } }),
    font : Enum({ values: gestalt.webfonts, init: 'Manrope', element: { look: 'combobox' } }),
  };
