// downloader :: config.rat.js

import { FOLDERS } from '@rat/app/modules/folders.js';

import config from './../zugriff.config.js';

export default {
  ...config,
  name : 'Downloader',

  // the elements of @aufbau the app uses, defined before its code runs (no autoloader: a build takes these and no others)
  import : [
    '@aufbau/elements/webcomponents/input/tags.js',
    '@aufbau/elements/webcomponents/btn-icon.js',
    '@aufbau/elements/webcomponents/btn-push.js',
    '@aufbau/elements/webcomponents/btn-tap.js',
    '@aufbau/elements/webcomponents/input-option.js',
    '@aufbau/elements/webcomponents/media-file.js',
    '@aufbau/elements/webcomponents/pop-toast.js',
    '@aufbau/elements/webcomponents/svg-icon.js',
  ],

  autoImport : ['./components/', './views/', '../.shared/components/'],

  database : {
    schema : {
      downloads : null,      // key: the download's id
      folders   : FOLDERS,   // the folder a finished file may go to (folders, @rat/app)
      packages  : null,      // key: the package's id
    },
  },
  dialogs : true,                                  // a webdav place, a plugin
  folders : { id: 'downloader', scan: false },     // one folder, the target 'folder'
  offline : true,

  hotkeys : {
    'escape' : { exec: 'close' },
    'g'      : { exec: 'grab' },
    'l'      : { exec: 'library' },
    'q'      : { exec: 'queue' },
  },

  icons : {
    ...config.icons,
    cancelled : 'lucide:circle-slash',
    clear     : 'lucide:brush-cleaning',
    done      : 'lucide:circle-check',
    failed    : 'lucide:circle-alert',
    library   : 'lucide:library',
    link      : 'lucide:link',
    package   : 'lucide:package',
    paused    : 'lucide:circle-pause',
    queue     : 'lucide:list-video',
    queued    : 'lucide:clock',
    retry     : 'lucide:rotate-cw',
    running   : 'lucide:circle-arrow-down',
    search    : 'lucide:search',
  },

  build : { emptyOutDir: true, outDir: '../../../apps/downloader' },   // rat build -> apps/downloader
};
