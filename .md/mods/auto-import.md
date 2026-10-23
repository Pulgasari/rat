# autoImport

no mod: nothing lands on `RAT.app`, it is a setting of the loader (`packages/app/loader.js`), read by `<rat-app>` from `config.rat.js`.

a component the markup uses (`<Dock />`) that the file neither imports nor declares is looked for in these folders, relative to the `config.rat.js` of the app, as `Dock.rat.html`, `Dock.rat`, `Dock.rat.js`. the first file found is imported. none: an error that names the file, the component and the folders. an import of its own or a local name always wins.

| | |
|---|---|
| `autoImport: true` | the folder of the config |
| `autoImport: '../.shared/components/'` | one folder |
| `autoImport: ['./components/', './views/']` | in this order |
| `autoImport: { './components/': ['Dock', 'Footer'] }` | only these names there |

a path is relative to the `config.rat.js` the app loads, also when it comes from a shared config spread into it (`...config`): `../zugriff.config.js` writes `'../.shared/components/'`, seen from `apps/notes/`.

the folders are probed with a request per extension, once per name and page load; what a file compiles to stays in the cache (`rat:compiled`), the lookup does not.

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
```

## examples

```js
...
autoImport: [
  './components/',
  './views/',
],
...
```
