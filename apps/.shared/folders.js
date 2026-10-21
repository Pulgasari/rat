// apps/.shared/folders.js

/*
folders the user grants, kept over visits: their handles in a table of the
app's database, their content as trees through @rat/bunker's Files. the ui
reads the signals.

  // config.rat.js: mods: { database: { schema: { folders: FOLDERS } } }
  const folders = createFolders({ accept: 'md, markdown', table: app.database.folders });

  await folders.load();              // the stored ones, their permission (never asks), the granted ones scanned
  await folders.add();               // the picker, inside a click. null when cancelled
  await folders.reconnect(id);       // asks again, inside a click
  await folders.repick(id);          // the picker for a folder that will not reconnect
  await folders.remove(id);          // forgets it, the files stay
  await folders.scan(id);
  folders.nodeAt(id, path);          // a file node of a tree, or null
  await folders.read(node);          // its text, fresh off disk

  folders.sources    signal [{ id, name }], in the order they were added
  folders.perms      signal { id: 'granted' | 'prompt' | 'denied' }
  folders.trees      signal { id: tree }, tree: { kind: 'dir' | 'file', name, path, entry, children }
  folders.scanning   signal { id: true } while one is scanned
  folders.ready      signal: true once load() knows the folders

accept: extensions ('md, markdown', ['md']), a function of the name, or nothing for every file.
*/

import { Files }  from '@rat/bunker';
import { Id }     from '@rat/types';
import { signal } from '@rat/signals';

// the fields of the table that holds the folders
const FOLDERS = { added: Number, handle: Object, id: Id, name: String };

function acceptOf (spec) {
  if (!spec || spec === '*')      return () => true;
  if (typeof spec === 'function') return spec;
  const extensions = new Set([spec].flat().flatMap(part => String(part).split(/[,\s]+/)).filter(Boolean).map(part => part.replace(/^\./, '').toLowerCase()));
  return name => extensions.has(name.slice(name.lastIndexOf('.') + 1).toLowerCase());
}

// a tree of @rat/bunker Files as the ui reads it
const nodeOf = ({ children, entry }) => ({ children: children?.map(nodeOf) ?? null, entry, kind: entry.kind === 'folder' ? 'dir' : 'file', name: entry.name, path: entry.path });

// one key of a signal holding an object, undefined removes it
function patch (target, key, value) {
  const next = { ...target.value };
  if (value === undefined) delete next[key];
  else next[key] = value;
  target.value = next;
}

function createFolders ({ accept, id = 'folders', table }) {
  const test  = acceptOf(accept);
  const files = new Map;   // id -> Files

  const rootOf = async sourceId => (await files.get(sourceId).root());

  const folders = {
    perms    : signal({}),
    ready    : signal(false),
    scanning : signal({}),
    sources  : signal([]),
    trees    : signal({}),

    async load () {
      const rows = (await table.values()).sort((a, b) => a.added - b.added);
      for (const row of rows) files.set(row.id, new Files({ root: row.handle }));
      folders.sources.value = rows.map(({ id, name }) => ({ id, name }));
      for (const row of rows) patch(folders.perms, row.id, await (await rootOf(row.id)).permission());
      folders.ready.value = true;
      for (const row of rows) if (folders.perms.value[row.id] === 'granted') folders.scan(row.id).catch(() => {});
    },

    async add () {
      const picked = await Files.pick({ id });
      if (!picked) return null;
      const root = await picked.root();
      for (const sourceId of files.keys()) {
        if (await (await rootOf(sourceId)).handle.isSameEntry?.(root.handle)) throw new Error('That folder is open already.');
      }
      const row = await table.add({ added: Date.now(), handle: root.handle, name: root.name });
      files.set(row.id, picked);
      folders.sources.value = [...folders.sources.value, { id: row.id, name: row.name }];
      patch(folders.perms, row.id, 'granted');
      await folders.scan(row.id);
      return row;
    },

    async reconnect (sourceId) {
      const state = await (await rootOf(sourceId)).request();
      patch(folders.perms, sourceId, state);
      if (state === 'granted') await folders.scan(sourceId);
      return { granted: state === 'granted', state };
    },

    async repick (sourceId) {
      const picked = await Files.pick({ id });
      if (!picked) return false;
      const root = await picked.root();
      await table.update(sourceId, { handle: root.handle, name: root.name });
      files.set(sourceId, picked);
      folders.sources.value = folders.sources.value.map(source => source.id === sourceId ? { id: sourceId, name: root.name } : source);
      patch(folders.perms, sourceId, 'granted');
      await folders.scan(sourceId);
      return true;
    },

    async remove (sourceId) {
      await table.delete(sourceId);
      files.delete(sourceId);
      folders.sources.value = folders.sources.value.filter(source => source.id !== sourceId);
      for (const target of [folders.perms, folders.scanning, folders.trees]) patch(target, sourceId, undefined);
    },

    // a grant that lapsed meanwhile puts the folder back to 'prompt'
    async scan (sourceId) {
      patch(folders.scanning, sourceId, true);
      try   { patch(folders.trees, sourceId, nodeOf(await files.get(sourceId).tree('', { accept: test }))); }
      catch (error) {
        if (error?.name === 'NotAllowedError') patch(folders.perms, sourceId, 'prompt');
        throw error;
      }
      finally { patch(folders.scanning, sourceId, undefined); }
    },

    nodeAt (sourceId, path) {
      const find = node => !node ? null
        : node.kind === 'file' ? (node.path === path ? node : null)
        : (node.children ?? []).reduce((found, child) => found ?? find(child), null);
      return find(folders.trees.value[sourceId]);
    },

    read : node => node.entry.read('text'),
  };

  return folders;
}

// :::::: EXPORT

export { FOLDERS, createFolders };
