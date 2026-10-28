// tools :: config.rat.js

import config from './../zugriff.config.js';

export default {
  ...config,
  name : 'Tools',

  // the elements of @aufbau the app uses, defined before its code runs (no autoloader: a build takes these and no others)
  import : [
    '@aufbau/elements/webcomponents/input/tags.js',
    '@aufbau/elements/webcomponents/btn-icon.js',
    '@aufbau/elements/webcomponents/btn-push.js',
    '@aufbau/elements/webcomponents/btn-tap.js',
    '@aufbau/elements/webcomponents/pop-toast.js',
    '@aufbau/elements/webcomponents/svg-icon.js',
    '@aufbau/elements/webcomponents/write-code.js',
  ],

  autoImport : ['./components/', '../.shared/components/'],
  offline    : true,

  icons : {
    ...config.icons,
    'arrow-right'  : 'lucide:arrow-right',
    braces         : 'mdi:code-braces',
    brackets       : 'mdi:code-brackets',
    check          : 'lucide:check',
    'check-circle' : 'lucide:circle-check',
    checkers       : 'mdi:checkerboard',
    circle         : 'lucide:circle',
    dice           : 'mdi:dice-multiple-outline',
    eraser         : 'lucide:eraser',
    'file-code'    : 'mdi:file-code-outline',
    'file-cog'     : 'mdi:file-cog-outline',
    fill           : 'lucide:paint-bucket',
    'fill-all'     : 'lucide:palette',
    'flip-h'       : 'lucide:flip-horizontal-2',
    'flip-v'       : 'lucide:flip-vertical-2',
    format         : 'mdi:auto-fix',
    gap            : 'mdi:dots-grid',
    invert         : 'mdi:invert-colors',
    lock           : 'lucide:lock',
    'lock-open'    : 'lucide:lock-open',
    minus          : 'lucide:minus',
    'mirror-xy'    : 'mdi:vector-combine',
    null           : 'mdi:null',
    number         : 'mdi:numeric',
    path           : 'mdi:vector-link',
    pdf            : 'mdi:file-pdf-box',
    pipette        : 'lucide:pipette',
    quote          : 'mdi:format-quote-close',
    redo           : 'lucide:redo-2',
    run            : 'mdi:lightning-bolt',
    search         : 'lucide:search',
    'select-all'   : 'mdi:select-all',
    stop           : 'lucide:square',
    swap           : 'lucide:arrow-left-right',
    table          : 'mdi:table',
    text           : 'lucide:type',
    toggle         : 'mdi:toggle-switch-outline',
    undo           : 'lucide:undo-2',
    web            : 'lucide:globe',
    'zoom-in'      : 'lucide:zoom-in',
    'zoom-out'     : 'lucide:zoom-out',
  },


  build : { emptyOutDir: true, outDir: '../../../apps/tools' },   // rat build -> apps/tools
};
