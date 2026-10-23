// apps/feeds/state.js
// what more than one part of the app reads and writes

import { signal } from '@rat/signals';

export const state = {
  busy   : signal(''),     // a label while a long task runs
  feedId : signal(null),   // the feed of the 'feed' view (should persist: open, how signals persist)
};

export default state;
