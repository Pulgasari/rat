// config.rat.js

import config from './../zugriff.config.js';

import { FOLDERS } from '@rat/app/modules/folders.js';

export default {
  ...config,
  name: 'eBooks',

  // the components of this app first, then the shared ones
  autoImport : ['./components/', '../.shared/components/'],

  database: {
    schema: {
      books    : null,      // key: '<source id>/<path>'
      folders  : FOLDERS,   // the granted folders (@rat/app/modules/folders.js)
      progress : null,      // key: the book key
    },
  },
  imports: { // schlicht hier importmap erweiterbar -> run.js liest das mit aus?
    "pdf-lib"      : "https://esm.sh/pdf-lib@1.17.1",
    "pdfjs"        : "https://esm.sh/pdfjs-dist@4.4.168",
    "pdfjs-worker" : "https://esm.sh/pdfjs-dist@4.4.168/build/pdf.worker.min.mjs",
    "epubjs"       : "https://esm.sh/epubjs@0.3.93",
  }
};
