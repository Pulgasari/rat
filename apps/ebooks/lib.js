// apps/ebooks/lib.js
//
// the library: the folders the user grants (../.shared/folders.js), the books found
// in them (table books) and where each one was left (table progress).
//
// scanning is two-phase: a scan lists the files and shows the shelf at once with
// filename titles, then a few books at a time are opened to pull real metadata and
// a cover (library.js), the grid updating as each one lands. a book is opened again
// only when its size or date changed.

import { effect, signal } from '@rat/signals';

import { createFolders } from '../.shared/folders.js';

import { extractMeta, kindOf, prettyName } from './library.js';

const QUEUE = 3;   // books opened at once for their metadata

const db    = () => RAT.app.database;
const keyOf = (sourceId, path) => `${sourceId}/${path}`;

// :::::: STATE

export const books    = signal([]);   // [{ key, sourceId, path, name, kind, title, author, cover, sig, metaDone, pages, addedAt }]
export const progress = signal({});   // key -> { location, page, pages, percent, updatedAt, lastOpenedAt }
export const pending  = signal(0);    // books still waiting for their metadata

export const folders = createFolders({ accept: 'epub, pdf', id: 'ebooks', table: RAT.app.database.folders });

export const bookByKey  = key => books.value.find(book => book.key === key) ?? null;
export const progressOf = key => progress.value[key] ?? null;

// :::::: LOAD

export async function load () {
  books.value    = await db().books.values();
  progress.value = await db().progress.as(Object);
  await folders.load();
}

// a folder whose tree changed is synced into the books, once per tree
const synced = new Map;   // source id -> the tree last synced

effect(() => {
  for (const [id, tree] of Object.entries(folders.trees.value)) {
    if (synced.get(id) === tree) continue;
    synced.set(id, tree);
    sync(id, tree);
  }
});

const filesOf = node => !node ? [] : node.kind === 'file' ? [node] : (node.children ?? []).flatMap(filesOf);

async function sync (sourceId, tree) {
  const known = new Map(books.value.filter(book => book.sourceId === sourceId).map(book => [book.key, book]));

  const next = await Promise.all(filesOf(tree).map(async node => {
    const key  = keyOf(sourceId, node.path);
    const info = await node.entry.info();
    const sig  = `${info?.size}:${info?.modified}`;
    const prev = known.get(key);
    if (prev?.sig === sig) return prev;
    return {
      addedAt  : prev?.addedAt ?? Date.now(),
      author   : '',
      cover    : prev?.cover ?? null,
      key,
      kind     : kindOf(node.name),
      metaDone : false,
      name     : node.name,
      pages    : null,
      path     : node.path,
      sig,
      sourceId,
      title    : prettyName(node.name),
    };
  }));

  const gone    = [...known.keys()].filter(key => !next.some(book => book.key === key));
  const changed = next.filter(book => known.get(book.key) !== book);
  await Promise.all([...gone.map(key => db().books.delete(key)), ...changed.map(book => db().books.set(book.key, book))]);

  books.value = [...books.value.filter(book => book.sourceId !== sourceId), ...next];
  enqueue(next.filter(book => !book.metaDone));
}

// :::::: METADATA, a few books at a time

const waiting = [];
let   running = 0;

function enqueue (list) {
  waiting.push(...list);
  pump();
}

function pump () {
  pending.value = waiting.length + running;
  while (running < QUEUE && waiting.length) {
    const book = waiting.shift();
    running++;
    extract(book).finally(() => { running--; pump(); });
  }
}

async function extract (book) {
  const current = bookByKey(book.key);
  if (!current || current.metaDone || current.sig !== book.sig) return;   // a rescan came first

  let merged = { ...current, metaDone: true };   // a broken file is not retried on every load
  try {
    const info = await extractMeta(current.kind, await fileOf(current));
    merged = {
      ...merged,
      author : info.author || current.author,
      cover  : info.cover  ?? current.cover,
      pages  : info.pages  ?? current.pages,
      title  : info.title  || current.title,
    };
  }
  catch {}

  await db().books.set(merged.key, merged);
  books.value = books.value.map(other => other.key === merged.key ? merged : other);
}

// :::::: FOLDERS

export const addFolder = () => folders.add();
export const rescanAll = () => Promise.all(folders.sources.value.map(source => folders.scan(source.id)));
export const reconnect = id => folders.reconnect(id);
export const repick    = id => folders.repick(id);

// the folder goes, and with it its books and their progress
export async function removeFolder (id) {
  const doomed = books.value.filter(book => book.sourceId === id).map(book => book.key);
  await folders.remove(id);
  await Promise.all(doomed.flatMap(key => [db().books.delete(key), db().progress.delete(key)]));
  books.value = books.value.filter(book => book.sourceId !== id);
  const rest = { ...progress.value };
  for (const key of doomed) delete rest[key];
  progress.value = rest;
  synced.delete(id);
}

// :::::: FILES

const fileOf = book => folders.nodeAt(book.sourceId, book.path)?.entry.read('blob') ?? Promise.reject(new Error('This book is no longer in its folder.'));

// the file of a book, fresh off disk. opening happens after the click (in an effect),
// so there is no user gesture to prompt with: a folder that is not granted goes back
// to the library to be reconnected
export function openFile (book) {
  if (!folders.sources.value.some(source => source.id === book.sourceId)) return Promise.reject(new Error('This book’s folder is no longer open.'));
  if (folders.perms.value[book.sourceId] !== 'granted') return Promise.reject(new Error('Reconnect this book’s folder in the library first.'));
  return fileOf(book);
}

// :::::: PROGRESS

export async function saveProgress (key, patch) {
  const next = { ...progress.value[key], ...patch, updatedAt: Date.now() };
  progress.value = { ...progress.value, [key]: next };
  await db().progress.set(key, next);
  return next;
}

export const markOpened = key => saveProgress(key, { lastOpenedAt: Date.now() });

export async function clearProgress (key) {
  const rest = { ...progress.value };
  delete rest[key];
  progress.value = rest;
  await db().progress.delete(key);
}
