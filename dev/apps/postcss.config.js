// the css of the apps in a build (their .css files and the <style> of their components):
// gestalt's directives as plain css, its css functions written out for browsers without @function

import gestalt from '../../../gestalt/packages/postcss/index.js';

export default { plugins: [gestalt()] };
