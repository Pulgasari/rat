// zugriff.config.js

import icons from './.shared/icons.js';

export default {
  // app
  dir         : 'ltr',
  display     : 'standalone',
  lang        : 'en',
  orientation : 'any',
  viewport    : {
    width        : 'device-width',
    initialScale : 1,
    maximumScale : 1,
    userScalable : 'no',
    fit          : 'cover',
  },
  
  // short names for <svg-icon icon='close'> (@rat/app icons), an app adds its own: { ...config.icons, … }
  icons,

  // components without an import, relative to the config.rat.js of each app
  autoImport: [
    '../.shared/components/',
  ],

  // the gang
  aufbau: {
    elements: { mode: 'auto' },
  },
  gestalt: {
    palette: 'zombie',
  },
  
};

/*
// schema mit ui-hinweisen: form noch offen (todo.md), bis dahin aus

import { Union } from '@rat/types';
const Webfonts = Union.from (gestalt.webfonts);

settings : {
  dir  : Enum({ values: ['ltr', 'rtl'],                    element: { tag: 'input-choice', look: 'segments' } }),
  font : Enum({ values: Webfonts, init: 'Manrope', element: { tag: 'input-choice', look: 'combobox' } }),
},

import { Union } from '@rat/types';
const Webfonts = RAT.Union.from (gestalt.webfonts);

settings : {
  dir  : RAT.Enum({ values: ['ltr', 'rtl'],                    element: { tag: 'input-choice', look: 'segments' } }),
  font : RAT.Enum({ values: gestalt.webfonts, init: 'Manrope', element: { tag: 'input-choice', look: 'combobox' } }),
},
  
*/
