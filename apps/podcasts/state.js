// apps/podcasts/state.js
// what more than one part of the app reads and writes. a component takes the
// signals it needs: let { $busy, $dialog } = state

import { signal } from '@rat/signals';
import { $Map }   from '@rat/types';

export const state = {
  busy     : signal(''),     // a label while a long task runs
  dialog   : signal(null),   // the open dialog, by name ('add')
  progress : new $Map,       // episode id -> { position, duration, done, saved … }, read per row
  search   : signal(''),     // the episode filter of SearchPanel
};

export default state;
