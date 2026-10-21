// zugriff.config.js

export default {
  // app
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
  
  // mods
  mods: {
    'auto-import': [ 
      './.shared/components/'
    ],
  },

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
