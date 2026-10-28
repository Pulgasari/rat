// subotnik :: config.rat.js

import { GLYPHS }  from './modules/launcher.js';
import { aliases } from '../.shared/glyphs.js';

export default {
  name : 'Subotnik',
  lang : 'de',

  viewport : { fit: 'cover', initialScale: 1, width: 'device-width' },

  // the elements of @aufbau the app uses, defined before its code runs
  import : [
    '@aufbau/elements/webcomponents/pop-toast.js',
    '@aufbau/elements/webcomponents/svg-icon.js',
  ],

  autoImport : ['./components/'],

  // the launcher's own glyphs, offline (app.rat.html provides them)
  icons : aliases('sub', GLYPHS),

  // localStorage and rat's own dialogs: no capacitor plugin beyond the app's Launcher
  dialogs : { driver: 'web' },
  store   : { driver: 'web' },

  // the native project (java, manifest, gradle) lives in wallpaperfx, its webDir is this build
  capacitor : '../../../../wallpaperfx/apps/subotnik',
  build     : { emptyOutDir: true, outDir: '../../../../wallpaperfx/apps/subotnik/www' },
};
