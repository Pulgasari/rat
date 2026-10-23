// apps/ebooks/shelf.js
// the books the library shows: filtered by folder and search, sorted

import { computed } from '@rat/signals';

import { books, progressOf } from './lib.js';
import { state }             from './state.js';

const authorOf     = book => book.author || '';
const lastOpenedOf = book => progressOf(book.key)?.lastOpenedAt || 0;
const compare      = (a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' });

export const sortBooks = (list, mode) => [...list].sort((a, b) =>
    mode === 'title'  ? compare(a.title, b.title)
  : mode === 'author' ? compare(authorOf(a), authorOf(b)) || compare(a.title, b.title)
  : mode === 'added'  ? (b.addedAt || 0) - (a.addedAt || 0)
  :                     lastOpenedOf(b) - lastOpenedOf(a) || (b.addedAt || 0) - (a.addedAt || 0));

export const visibleBooks = computed(() => {
  const query  = state.search.value.trim().toLowerCase();
  const folder = state.folder.value;
  let list = books.value;
  if (folder) list = list.filter(book => book.sourceId === folder);
  if (query)  list = list.filter(book => [book.title, authorOf(book), book.name].some(text => text.toLowerCase().includes(query)));
  return sortBooks(list, state.sort.value);
});
