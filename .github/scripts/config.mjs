// .github/scripts/config.mjs
// values of .github/config.js for the yaml: `node config.mjs >> "$GITHUB_OUTPUT"`, then
// ${{ steps.config.outputs.node }}. a list is joined with spaces

import config from '../config.js';

const outputs = {
  debounce : config.debounce,
  java     : config.android.java,
  node     : config.node,
  sdk      : config.android.sdk.join(' '),
};

for (const [key, value] of Object.entries(outputs)) console.log(`${key}=${value}`);
