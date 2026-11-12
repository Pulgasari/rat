// .github/config.js
// what the workflows do, as data:
// read by .github/scripts (config.mjs hands values to the yaml)

export default {
  debounce : 420,   // seconds a push waits before it builds, a newer one cancels it
  node     : 24,

  // checked out next to rat: the import map points into them
  repos : ['aufbau', 'bunker', 'domina', 'gestalt', 'htx', 'js-packages'],
};
