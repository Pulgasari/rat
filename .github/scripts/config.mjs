// .github/scripts/config.mjs
// values of .github/config.js for the yaml: `node config.mjs >> "$GITHUB_OUTPUT"`, then
// ${{ steps.config.outputs.node }}. a list is joined with spaces

import config from '../config.js';

const outputs = {
  debounce : config.debounce,
  node     : config.node,
};

for (const [key, value] of Object.entries(outputs)) console.log(`${key}=${value}`);
