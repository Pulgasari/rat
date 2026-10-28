// images :: config.rat.js

import { FOLDERS } from '@rat/app/modules/folders.js';

import config from './../zugriff.config.js';

export default {
  ...config,
  name : 'Images',

  // the elements of @aufbau the app uses, defined before its code runs (no autoloader: a build takes these and no others)
  import : [
    '@aufbau/elements/webcomponents/btn-icon.js',
    '@aufbau/elements/webcomponents/btn-push.js',
    '@aufbau/elements/webcomponents/btn-tap.js',
    '@aufbau/elements/webcomponents/pop-toast.js',
    '@aufbau/elements/webcomponents/svg-icon.js',
  ],

  autoImport : ['./components/', '../.shared/components/'],

  database   : { schema: { folders: FOLDERS, pics: null } },   // pics, key: '<source id>/<path>'
  folders    : { accept: 'avif, bmp, gif, heic, heif, ico, jfif, jpeg, jpg, png, svg, tif, tiff, webp' },
  offline    : true,
  thumbnails : { width: 320 },

  icons : {
    ...config.icons,
    batch           : 'lucide:images',
    blur            : 'mdi:blur',
    brightness      : 'lucide:sun',
    check           : 'lucide:check',
    contrast        : 'lucide:contrast',
    convert         : 'lucide:file-symlink',
    crop            : 'lucide:crop',
    effects         : 'lucide:wand-sparkles',
    export          : 'lucide:download',
    'eye-off'       : 'lucide:eye-off',
    fit             : 'lucide:scan',
    'flip-h'        : 'lucide:flip-horizontal-2',
    'flip-v'        : 'lucide:flip-vertical-2',
    folders         : 'lucide:folders',
    fullscreen      : 'lucide:maximize',
    grayscale       : 'mdi:invert-colors',
    'image-add'     : 'lucide:image-plus',
    images          : 'lucide:images',
    link            : 'lucide:link',
    'link-off'      : 'lucide:unlink',
    quality         : 'lucide:gauge',
    redo            : 'lucide:redo-2',
    reset           : 'lucide:rotate-ccw',
    resize          : 'lucide:scaling',
    'rotate-ccw'    : 'lucide:rotate-ccw-square',
    'rotate-cw'     : 'lucide:rotate-cw-square',
    run             : 'lucide:play',
    search          : 'lucide:search',
    strip           : 'lucide:gallery-horizontal',
    tune            : 'lucide:sliders-horizontal',
    undo            : 'lucide:undo-2',
    watermark       : 'lucide:stamp',
    'zoom-in'       : 'lucide:zoom-in',
    'zoom-out'      : 'lucide:zoom-out',
  },

  build : { emptyOutDir: true, outDir: '../../../apps/images' },   // rat build -> apps/images
};
