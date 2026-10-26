// files :: modules/places.js

/*
what the user marks in the folder: bookmarks, and the type a folder is given. both belong to the
granted folder they were made in, a different folder starts empty. a path is the array of names below
the root, [] the root.

folder types: audio, documents, images and videos are built in, more are made with a name and an icon.
a folder has one type or none; suggest() reads a listing and names the category most of its files
belong to. a type changes the folder's icon for now, a default view per type comes later.
*/

import { effect, signal } from '@rat/signals';

import { read, write } from '../../.shared/storage.js';
import { folder }      from './root.js';

const stored = (key, fallback) => {
  const value = signal(read(key, fallback));
  effect(() => write(key, value.value));
  return value;
};

const bookmarked  = stored('files:bookmarks',   []);   // [{ folder, name, path }]
const folderTyped = stored('files:folderTyped', {});   // { 'folder:a/b': typeId }
const folderTypes = stored('files:folderTypes', []);   // the user's own, [{ icon, id, label }]

// :::::: TYPES

// the built-in ones carry the id of the scan category they stand for
export const BUILTIN = [
  { icon: 'lucide:music',     id: 'audio',     label: 'Audio'     },
  { icon: 'lucide:file-text', id: 'documents', label: 'Documents' },
  { icon: 'lucide:image',     id: 'images',    label: 'Images'    },
  { icon: 'lucide:film',      id: 'video',     label: 'Videos'    },
];

const folderId = () => folder.value?.addedAt ?? folder.value?.name ?? '';
const keyOf    = path => `${folderId()}:${path.join('/')}`;
const samePath = (a, b) => a.join('/') === b.join('/');

export const types = () => [...BUILTIN, ...folderTypes.value];

export function typeOf (path) {
  const id = folderTyped.value[keyOf(path)];
  return id ? types().find(type => type.id === id) ?? null : null;
}

export function setType (path, id) {
  const typed = { ...folderTyped.value };
  if (id) typed[keyOf(path)] = id;
  else delete typed[keyOf(path)];
  folderTyped.value = typed;
}

export function addType ({ icon = 'lucide:folder', label }) {
  const id = `custom-${Date.now().toString(36)}`;
  folderTypes.value = [...folderTypes.value, { icon, id, label }];
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

export const bookmarks    = () => bookmarked.value.filter(bookmark => bookmark.folder === folderId());
export const isBookmarked = path => bookmarks().some(bookmark => samePath(bookmark.path, path));

export function toggleBookmark (path, name) {
  bookmarked.value = isBookmarked(path)
    ? bookmarked.value.filter(bookmark => !(bookmark.folder === folderId() && samePath(bookmark.path, path)))
    : [...bookmarked.value, { folder: folderId(), name, path }];
}
