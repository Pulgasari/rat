// apps/.shared/gallery.js
//
// the files of the folders the user grants (RAT.app.folders) as a flat list of items in a table of the
// app's database: images, videos. a scan lists every file, an item is written again only when its size
// or date changed. what an item shows (a thumbnail, a poster) is the app's, through RAT.app.thumbnails
//
//   const gallery = createGallery({ table: 'pics' });   // config.rat.js: database: { schema: { folders: FOLDERS, pics: null } }
//   await gallery.load();
//   gallery.items     signal [{ key, sourceId, path, name, sig, added }]
//   gallery.open(item)    the file, fresh off disk
//   gallery.add(), gallery.rescan(), gallery.remove(id)

import { effect, signal } from '@rat/signals';

const keyOf   = (sourceId, path) => `${sourceId}/${path}`;
const filesOf = node => !node ? [] : node.kind === 'file' ? [node] : (node.children ?? []).flatMap(filesOf);

export function createGallery ({ table }) {
  const db      = () => RAT.app.database[table];
  const folders = () => RAT.app.folders;

  const items  = signal([]);
  const synced = new Map;   // source id -> the tree last synced

  async function sync (sourceId, tree) {
    const known = new Map(items.value.filter(item => item.sourceId === sourceId).map(item => [item.key, item]));

    const next = await Promise.all(filesOf(tree).map(async node => {
      const key  = keyOf(sourceId, node.path);
      const info = await node.entry.info();
      const sig  = `${info?.size}:${info?.modified}`;
      const prev = known.get(key);
      return prev?.sig === sig ? prev : { added: prev?.added ?? Date.now(), key, name: node.name, path: node.path, sig, sourceId };
    }));

    const gone    = [...known.keys()].filter(key => !next.some(item => item.key === key));
    const changed = next.filter(item => known.get(item.key) !== item);
    await Promise.all([...gone.map(key => db().delete(key)), ...changed.map(item => db().set(item.key, item))]);

    items.value = [...items.value.filter(item => item.sourceId !== sourceId), ...next];
  }

  // a folder whose tree changed is synced, once per tree
  effect(() => {
    for (const [id, tree] of Object.entries(folders().trees.value)) {
      if (synced.get(id) === tree) continue;
      synced.set(id, tree);
      sync(id, tree);
    }
  });

  async function load () {
    items.value = await db().values();
    await folders().load();
  }

  function open (item) {
    if (folders().perms.value[item.sourceId] !== 'granted') return Promise.reject(new Error('Reconnect the folder of this file first.'));
    return folders().nodeAt(item.sourceId, item.path)?.entry.read('blob') ?? Promise.reject(new Error(`${item.name} is no longer in its folder`));
  }

  async function add () {
    if (!('showDirectoryPicker' in globalThis) && !globalThis.Capacitor?.isNativePlatform?.()) throw new Error('This browser can’t open folders: try Chrome, Edge or another Chromium browser.');
    return folders().add();
  }

  const rescan = () => Promise.all(folders().sources.value.map(source => folders().scan(source.id)));

  // the folder goes, and with it its items
  async function remove (id) {
    const doomed = items.value.filter(item => item.sourceId === id).map(item => item.key);
    await folders().remove(id);
    await Promise.all(doomed.map(key => db().delete(key)));
    items.value = items.value.filter(item => item.sourceId !== id);
    synced.delete(id);
  }

  return { add, items, load, open, remove, rescan };
}

export default createGallery;
