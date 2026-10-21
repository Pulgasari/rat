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
  
  aufbau: {
    elements: { mode: 'auto' },
  },
  gestalt: {
    palette: 'zombie',
  },
  
  // schema mit ui-hinweisen: form noch offen (todo.md), bis dahin aus
  /*
  settings : {
    dir  : Enum({ values: ['ltr', 'rtl'], element: { look: 'segments' } }),
    font : Enum({ values: gestalt.webfonts, init: 'Manrope', element: { look: 'combobox' } }),
  },
  */
};
