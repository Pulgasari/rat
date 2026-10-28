// subotnik-wallpapers :: config.rat.js

import { GLYPHS }  from './modules/glyphs.js';
import { aliases } from '../.shared/glyphs.js';

export default {
  name : 'Wallpapers',
  lang : 'de',

  viewport : { fit: 'cover', initialScale: 1, width: 'device-width' },

  // the elements of @aufbau the app uses, defined before its code runs
  import : [
    '@aufbau/elements/webcomponents/pop-toast.js',
    '@aufbau/elements/webcomponents/svg-icon.js',
  ],

  autoImport : ['./components/'],

  // the app's own glyphs, offline (app.rat.html provides them)
  icons : aliases('wp', GLYPHS),

  // localStorage: no capacitor plugin beyond the app's Wallpaper
  store : { driver: 'web' },

  // the native project (java, gl engine, manifest, gradle) lives in wallpaperfx, its webDir is this build
  capacitor : '../../../../wallpaperfx/apps/subotnik-wallpapers',
  build     : { emptyOutDir: true, outDir: '../../../../wallpaperfx/apps/subotnik-wallpapers/www' },
};
