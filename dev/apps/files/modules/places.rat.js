// files :: modules/places.rat.js

/*
what the user marks in the folder: bookmarks, and the type a folder is given. both belong to the
granted folder they were made in, a different folder starts empty. a path is the array of names below
the root, [] the root.

folder types: audio, documents, images and videos are built in, more are made with a name and an icon.
a folder has one type or none; suggest() reads a listing and names the category most of its files
belong to. a type changes the folder's icon for now, a default view per type comes later.
*/

import { effect } from '@rat/signals';

import { read, write } from '../../.shared/storage.js';
import { $folder }     from './root.rat.js';

let $bookmarked  = read('files:bookmarks',   []);   // [{ folder, name, path }]
let $folderTyped = read('files:folderTyped', {});   // { 'folder:a/b': typeId }
let $folderTypes = read('files:folderTypes', []);   // the user's own, [{ icon, id, label }]

effect(() => write('files:bookmarks',   $bookmarked));
effect(() => write('files:folderTyped', $folderTyped));
effect(() => write('files:folderTypes', $folderTypes));

// :::::: TYPES

// the built-in ones carry the id of the scan category they stand for
export const BUILTIN = [
  { icon: 'lucide:music',     id: 'audio',     label: 'Audio'     },
  { icon: 'lucide:file-text', id: 'documents', label: 'Documents' },
  { icon: 'lucide:image',     id: 'images',    label: 'Images'    },
  { icon: 'lucide:film',      id: 'video',     label: 'Videos'    },
];

const folderId = () => $folder?.addedAt ?? $folder?.name ?? '';
const keyOf    = path => `${folderId()}:${path.join('/')}`;
const samePath = (a, b) => a.join('/') === b.join('/');

export const types = () => [...BUILTIN, ...$folderTypes];

export function typeOf (path) {
  const id = $folderTyped[keyOf(path)];
  return id ? types().find(type => type.id === id) ?? null : null;
}

export function setType (path, id) {
  const typed = { ...$folderTyped };
  if (id) typed[keyOf(path)] = id;
  else delete typed[keyOf(path)];
  $folderTyped = typed;
}

export function addType ({ icon = 'lucide:folder', label }) {
  const id = `custom-${Date.now().toString(36)}`;
  $folderTypes = [...$folderTypes, { icon, id, label }];
  return id;
}

// the category most of the files belong to, when it is most of them
export function suggest (entries, categoryOf) {
  const files  = entries.filter(entry => entry.kind === 'file');
  const counts = {};
  for (const entry of files) counts[categoryOf(entry)] = (counts[categoryOf(entry)] ?? 0) + 1;

  const [id, count] = Object.entries(counts).sort((a, b) => b[1] - a[1])[0] ?? [];
  return id && count / files.length >= 0.6 ? BUILTIN.find(type => type.id === id) ?? null : null;
}

// :::::: BOOKMARKS

export const bookmarks    = () => $bookmarked.filter(bookmark => bookmark.folder === folderId());
export const isBookmarked = path => bookmarks().some(bookmark => samePath(bookmark.path, path));

export function toggleBookmark (path, name) {
  $bookmarked = isBookmarked(path)
    ? $bookmarked.filter(bookmark => !(bookmark.folder === folderId() && samePath(bookmark.path, path)))
    : [...$bookmarked, { folder: folderId(), name, path }];
}
