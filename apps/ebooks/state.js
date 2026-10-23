// apps/ebooks/state.js
// what more than one part of the app reads and writes. a component takes the
// signals it needs: let { $search, $folder } = state

import { signal } from '@rat/signals';
import { $Enum }  from '@rat/types';

export const state = {
  bookKey : signal(null),   // the book in the reader (should persist: open, how signals persist)
  folder  : signal(''),     // '' = all folders, else a source id
  search  : signal(''),

  sort : new $Enum('recent', 'title', 'author', 'added'),   // should persist

  // epub reading prefs, remembered across books (should persist)
  readerFlow : signal('paginated'),
  readerFont : signal(100),
  readerUi   : signal({ ready: false }),
};

export default state;
