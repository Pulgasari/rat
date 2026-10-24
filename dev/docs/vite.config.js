// docs :: vite.config.js
// npm run build:docs -> the build of config.rat.js (outDir: docs/)

import rat from '../../packages/dev/unplugin.js';

export default {
  plugins : [rat.vite()],
  root    : import.meta.dirname,
};
