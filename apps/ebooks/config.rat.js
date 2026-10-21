// config.rat.js

import config from './../zugriff.config.js';

export default {
  ...config,
  name: 'eBooks',
  mods: {
    database: {},
  },
  imports: { // schlicht hier importmap erweiterbar -> run.js liest das mit aus?
    "pdf-lib"      : "https://esm.sh/pdf-lib@1.17.1",
    "pdfjs"        : "https://esm.sh/pdfjs-dist@4.4.168",
    "pdfjs-worker" : "https://esm.sh/pdfjs-dist@4.4.168/build/pdf.worker.min.mjs",
    "epubjs"       : "https://esm.sh/epubjs@0.3.93",
  }
};
