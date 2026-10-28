// code :: config.rat.js

import { FOLDERS } from '@rat/app/modules/folders.js';

import config from './../zugriff.config.js';

export default {
  ...config,
  name : 'Code',

  // the elements of @aufbau the app uses, defined before its code runs (no autoloader: a build takes these and no others)
  import : [
    '@aufbau/elements/webcomponents/input/tags.js',
    '@aufbau/elements/webcomponents/btn-icon.js',
    '@aufbau/elements/webcomponents/btn-push.js',
    '@aufbau/elements/webcomponents/input-option.js',
    '@aufbau/elements/webcomponents/pop-toast.js',
    '@aufbau/elements/webcomponents/svg-icon.js',
  ],

  autoImport : [
    { './components/': ['Browser', 'Commands', 'Editor', 'GitHubSource', 'Keyboard', 'LocalSource', 'Preferences', 'Root', 'RowMenu', 'Sources', 'Statusbar', 'Tabs', 'Taps', 'Toolbar', 'Tree', 'WebDAVSource', 'Welcome'] },
    '../.shared/components/',
  ],

  database : { schema: { folders: FOLDERS } },   // the granted folders' handles (modules/sources.rat.js)
  dialogs  : true,                               // names, a commit message, confirming a delete
  files    : true,                               // the webdav servers (.shared/webdav/remotes.rat.js)
  folders  : { id: 'code', scan: false },        // the folders granted, walked by the tree itself
  offline  : true,

  // global: monaco has the focus while one is pressed
  hotkeys : {
    'ctrl+p|ctrl+shift+p' : { exec: 'commands', global: true, preventDefault: true },
    'ctrl+s'              : { exec: 'save',     global: true, preventDefault: true },
    'ctrl+shift+s'        : { exec: 'save-all', global: true, preventDefault: true },
  },

  icons : {
    ...config.icons,
    'arrow-down'     : 'lucide:arrow-down',
    'arrow-left'     : 'lucide:arrow-left',
    'arrow-right'    : 'lucide:arrow-right',
    'arrow-up'       : 'lucide:arrow-up',
    backspace        : 'lucide:delete',
    capslock         : 'lucide:arrow-big-up-dash',
    commands         : 'lucide:command',
    'duplicate-line' : 'lucide:copy-plus',
    enter            : 'lucide:corner-down-left',
    'file-add'       : 'lucide:file-plus',
    'folder-tree'    : 'lucide:folder-tree',
    github           : 'lucide:github',
    'join-lines'     : 'lucide:merge',
    keyboard         : 'lucide:keyboard',
    lock             : 'lucide:lock',
    'move-line-down' : 'lucide:move-down',
    'move-line-up'   : 'lucide:move-up',
    redo             : 'lucide:redo-2',
    save             : 'lucide:save',
    'select-all'     : 'lucide:text-select',
    shift            : 'lucide:arrow-big-up',
    'sort-lines'     : 'lucide:arrow-down-a-z',
    space            : 'lucide:space',
    star             : 'lucide:star',
    starred          : 'mdi:star',   // filled against outlined: lucide has no filled ones
    tab              : 'lucide:arrow-right-to-line',
    'tab-rtl'        : 'lucide:arrow-left-to-line',
    toolbar          : 'lucide:wrench',
    undo             : 'lucide:undo-2',
  },

  build : { emptyOutDir: true, outDir: '../../../apps/code' },   // rat build -> apps/code
};
