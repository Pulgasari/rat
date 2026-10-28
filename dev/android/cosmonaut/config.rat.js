// cosmonaut :: config.rat.js

import { GLYPHS }  from './modules/glyphs.js';
import { aliases } from '../.shared/glyphs.js';

export default {
  name : 'Cosmonaut',
  lang : 'en',

  viewport : { fit: 'cover', initialScale: 1, width: 'device-width' },

  // the elements of @aufbau the app uses, defined before its code runs
  import : [
    '@aufbau/elements/webcomponents/pop-toast.js',
    '@aufbau/elements/webcomponents/svg-icon.js',
  ],

  autoImport : ['./components/'],

  // the chrome's own glyphs, offline (app.rat.html provides them)
  icons : aliases('cos', GLYPHS),

  // localStorage and rat's own dialogs: the capacitor plugins stay the app's (Browser, Filesystem)
  dialogs : { driver: 'web' },
  store   : { driver: 'web' },

  // the native project (content webviews, the resize trick, gradle) lives in wallpaperfx, its webDir is
  // this build
  capacitor : '../../../../wallpaperfx/apps/cosmonaut',
  build     : { emptyOutDir: true, outDir: '../../../../wallpaperfx/apps/cosmonaut/www' },
};
