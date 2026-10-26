// files :: config.rat.js

import config from './../zugriff.config.js';

export default {
  ...config,
  name : 'Files',

  // the elements of @aufbau the app uses, defined before its code runs (no autoloader: a build takes these and no others)
  import : [
    '@aufbau/elements/webcomponents/input/tags.js',
    '@aufbau/elements/webcomponents/btn-icon.js',
    '@aufbau/elements/webcomponents/btn-push.js',
    '@aufbau/elements/webcomponents/data-index.js',
    '@aufbau/elements/webcomponents/data-item.js',
    '@aufbau/elements/webcomponents/div-x.js',
    '@aufbau/elements/webcomponents/div-y.js',
    '@aufbau/elements/webcomponents/input-option.js',
    '@aufbau/elements/webcomponents/nav-crumbs.js',
    '@aufbau/elements/webcomponents/pop-toast.js',
    '@aufbau/elements/webcomponents/svg-icon.js',
  ],

  autoImport : [
    { './components/': ['Action', 'Bar', 'Context', 'Dashboard', 'Entry', 'Facts', 'FileRow', 'Library', 'Menu', 'PasteBar', 'Preferences', 'Preview', 'RemoteManager', 'Searchbar', 'Status', 'Sync', 'TaskList', 'Tabs', 'Thumb', 'Welcome'] },
    '../.shared/components/',
  ],

  database   : { schema: { root: null } },   // the granted folder's handle, key 'root'
  dialogs    : true,                         // prompt and confirm: new folder, rename, delete
  files      : true,                         // the index of the folder, kept between visits
  offline    : true,
  thumbnails : { maxBytes: 128 * 1024 * 1024, width: 256 },

  // rat build --target android: the android app, with the lan sending of the FileSync plugin
  android : { id: 'dev.pulgasari.files', name: 'Files', plugins: ['filesync'] },

  build : { emptyOutDir: true, outDir: '../../../apps/files' },   // rat build -> apps/files
};
