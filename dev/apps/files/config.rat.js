// files :: config.rat.js

import { FOLDERS } from '@rat/app/modules/folders.js';

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
    { './components/': ['Action', 'Bar', 'BookmarkAction', 'Context', 'Dashboard', 'Entry', 'EntryDetails', 'Facts', 'FileDetails', 'FileRow', 'FolderDetails', 'Library', 'Menu', 'PasteBar', 'Preferences', 'Preview', 'RemoteManager', 'RootDetails', 'Searchbar', 'Status', 'Sync', 'TaskList', 'Tabs', 'Thumb', 'Tile', 'Welcome'] },
    '../.shared/components/',
  ],

  database   : { schema: { folders: FOLDERS } },   // the granted folder's handle (modules/root.rat.js)
  dialogs    : true,                               // prompt and confirm: new folder, rename, delete
  files      : true,                               // the index of the folder, kept between visits
  folders    : { id: 'files', scan: false },       // one folder, walked by the app itself (modules/scan.rat.js)
  offline    : true,
  thumbnails : { maxBytes: 128 * 1024 * 1024, width: 256 },

  // rat build --target android: the android app, with the lan sending of the FileSync plugin
  android : { id: 'dev.pulgasari.files', name: 'Files', plugins: ['filesync'] },

  build : { emptyOutDir: true, outDir: '../../../apps/files' },   // rat build -> apps/files

  icons: {
    copy : 'lucide:copy',
    move : 'lucide:scissors',
  },
};
