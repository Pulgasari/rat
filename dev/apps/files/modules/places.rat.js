// files :: modules/places.rat.js

/*
what the user marks in the folder: bookmarks, and the foldertype a folder is given. both belong to the
granted folder they were made in, a different folder starts empty. a path is the array of names below
the root, [] the root.

foldertypes: audio, documents, images and videos are built in, more are made with a name and an icon.
a folder has one foldertype or none; suggestFolderType() reads a listing and names the category most of
its files belong to. a foldertype changes the folder's icon for now, a default view per type comes later.

  $folderTypes   every foldertype, the built-in ones first: { [id]: { icon, label } }
*/

// :::::: IMPORT

import { effect } from '@rat/signals';
import { $Dict, $Table, List, Str } from '@rat/types';

import { read, write } from '../../.shared/storage.js';
import { $folder }     from './root.rat.js';

// ::::::

const // ::: schemas
Bookmark   = { folder: Str, name: Str, path: List(Str) },
Foldertype = { icon: Str, label: Str };

const // ::: stored
$bookmarks      = $Table (Bookmark)        .create(read('files:bookmarks',   [])),   // [{ folder, name, path }]
$folderTyped    = $Dict  (Str, Str)        .create(read('files:folderTyped', {})),   // 'folder:a/b' -> foldertype id
$ownFolderTypes = $Dict  (Str, Foldertype) .create(read('files:folderTypes', {}));   // id -> { icon, label }

effect(() => write('files:bookmarks',   $bookmarks));
effect(() => write('files:folderTyped', $folderTyped));
effect(() => write('files:folderTypes', $ownFolderTypes));

const $folderId = String($folder?.addedAt ?? $folder?.name ?? '');

const keyOf = (path) => `${$folderId}:${path.join('/')}`;

// :::::: FOLDERTYPES

// the built-in ones by the id of the scan category they stand for
export const BUILTIN = {
  audio     : { icon: 'lucide:music',     label: 'Audio'     },
  documents : { icon: 'lucide:file-text', label: 'Documents' },
  images    : { icon: 'lucide:image',     label: 'Images'    },
  video     : { icon: 'lucide:film',      label: 'Videos'    },
};

export const $folderTypes = { ...BUILTIN, ...$ownFolderTypes.toJSON() };

export const
folderTypeIdOf = (path) => $folderTyped.get(keyOf(path)) ?? null,
folderTypeOf   = (path) => $folderTypes[folderTypeIdOf(path)] ?? null;

export function setFolderType (path, id) {
  const key = keyOf(path);
  if (id) $folderTyped.set    (key, id);
  else    $folderTyped.delete (key);
}

export function addFolderType ({ icon = 'lucide:folder', label }) {
  const id = crypto.randomUUID();
  $ownFolderTypes.set(id, { icon, label });
  return id;
}

// the id of the category most of the files belong to, when it is most of them
export function suggestFolderType (entries, categoryOf) {
  const files  = entries.filter(entry => entry.kind === 'file');
  const counts = {};
  for (const entry of files) counts[categoryOf(entry)] = (counts[categoryOf(entry)] ?? 0) + 1;

  const [id, count] = Object.entries(counts).sort((a, b) => b[1] - a[1])[0] ?? [];
  return id in BUILTIN && count / files.length >= 0.6 ? id : null;
}

// :::::: BOOKMARKS

export const
bookmarks    = ()     => $bookmarks.where ({ folder: $folderId }),
isBookmarked = (path) => $bookmarks.has   ({ folder: $folderId, path });

export const toggleBookmark = (path, name) => $bookmarks.toggle({ folder: $folderId, name, path }, { folder: $folderId, path });
