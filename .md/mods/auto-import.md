# @rat/mods/auto-import

```js
// config.rat.js
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
```

## examples

```js
...
mods: {
  'auto-import': [ 
    './components/',
    './views/',
  ],
},
...
```
