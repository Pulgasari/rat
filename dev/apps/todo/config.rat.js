// todo :: config.rat.js

import { FOLDERS } from '@rat/app/modules/folders.js';

import config from './../zugriff.config.js';

export default {
  ...config,
  name : 'Todo',

  // the elements of @aufbau the app uses, defined before its code runs (no autoloader: a build takes these and no others)
  import : [
    '@aufbau/elements/webcomponents/input/tags.js',
    '@aufbau/elements/webcomponents/btn-icon.js',
    '@aufbau/elements/webcomponents/btn-push.js',
    '@aufbau/elements/webcomponents/btn-tap.js',
    '@aufbau/elements/webcomponents/input-option.js',
    '@aufbau/elements/webcomponents/pop-toast.js',
    '@aufbau/elements/webcomponents/svg-icon.js',
    '@aufbau/elements/webcomponents/write-md.js',
  ],

  autoImport : ['./components/', './views/', '../.shared/components/'],

  database : {
    schema : {
      folders : FOLDERS,   // the folder the tasks are synced with (folders, @rat/app)
      lists   : null,      // key: the list's id
      tasks   : null,      // key: the task's id, a deleted one stays as a tombstone
    },
  },
  dialogs : true,                             // lists: new, rename, delete
  folders : { id: 'todo', scan: false },      // one folder, the sync place 'folder'
  offline : true,

  hotkeys : {
    'n'      : { exec: 'new' },
    '/'      : { exec: 'search', preventDefault: true },
    't'      : { exec: 'today' },
    'u'      : { exec: 'upcoming' },
    'x'      : { exec: 'tick' },
    'e'      : { exec: 'edit' },
    'escape' : { exec: 'close' },
    'ctrl+z' : { exec: 'undo' },
  },

  icons : {
    ...config.icons,
    bell     : 'lucide:bell',
    calendar : 'lucide:calendar-days',
    check    : 'lucide:check',
    done     : 'lucide:circle-check',
    hash     : 'lucide:hash',
    inbox    : 'lucide:inbox',
    notes    : 'lucide:sticky-note',
    open     : 'lucide:circle',
    repeat   : 'lucide:repeat',
    subtasks : 'lucide:list-checks',
    today    : 'lucide:sun',
    unlink   : 'lucide:unlink',
  },

  build : { emptyOutDir: true, outDir: '../../../apps/todo' },   // rat build -> apps/todo
};
