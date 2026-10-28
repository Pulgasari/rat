// prompts :: config.rat.js

import { Id, Num, Str } from '@rat/types';

import config from './../zugriff.config.js';

export default {
  ...config,
  name : 'Prompts',

  // the elements of @aufbau the app uses, defined before its code runs (no autoloader: a build takes these and no others)
  import : [
    '@aufbau/elements/webcomponents/input/tags.js',
    '@aufbau/elements/webcomponents/btn-icon.js',
    '@aufbau/elements/webcomponents/btn-push.js',
    '@aufbau/elements/webcomponents/input-option.js',
    '@aufbau/elements/webcomponents/pop-toast.js',
    '@aufbau/elements/webcomponents/svg-icon.js',
  ],

  autoImport : ['./components/', '../.shared/components/'],

  database : {
    schema : {
      prompts : { content: Str, createdAt: Num, id: Id, tags: Array, title: Str, updatedAt: Num },
      tags    : { color: Str, id: Id, name: Str },
    },
  },
  dialogs : true,   // deleting a prompt
  offline : true,

  hotkeys : {
    'escape' : { exec: 'back', global: true },
  },

  icons : {
    ...config.icons,
    check  : 'lucide:check',
    prompt : 'lucide:text-quote',
    search : 'lucide:search',
    tag    : 'lucide:tag',
    tags   : 'lucide:tags',
  },

  build : { emptyOutDir: true, outDir: '../../../apps/prompts' },   // rat build -> apps/prompts
};
