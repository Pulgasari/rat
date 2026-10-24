// docs :: vite.config.js
// npm run build:docs -> docs/

import rat from '../../packages/dev/unplugin.js';

export default {
  base    : './',
  build   : { assetsInlineLimit: 0, cssMinify: false, emptyOutDir: true, outDir: '../../docs' },
  plugins : [rat.vite()],
  root    : import.meta.dirname,
};
