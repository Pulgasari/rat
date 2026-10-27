// files :: modules/remotes.rat.js

/*
the servers the app reaches besides the granted folder. webdav for now (nextcloud and owncloud speak
it): a connection becomes a root handle (.shared/webdav/handles.js), so a tab browses it like the
folder, and copy, move, preview and thumbnails work across both.

the connections, password included, stay on the device (RAT.app.files), sent only to their own server.
an app password is the better choice where the server has one.

  $connections  [{ id, name, password, url, username }]
  add(fields)   tests the connection with a listing, then keeps it
  rootOf(id)    the root handle, one per connection
*/

// :::::: IMPORT

import { effect } from '@rat/signals';
import { $Table, Str } from '@rat/types';

import { test }    from '../../.shared/webdav/client.js';
import { davRoot } from '../../.shared/webdav/handles.js';

// ::::::

const FILE  = 'remotes.json';
const roots = new Map;   // id -> its root handle

const { files } = RAT.app;

const Connection = { id: Str, name: Str, password: Str, url: Str, username: Str };

const $rows = $Table(Connection).create(await files.read(FILE, 'json').catch(() => []));

effect(() => files.write(FILE, JSON.stringify($rows)));

// what the views read: a signal, as every $name another module imports
export const $connections = $rows.toArray();

export const byId = id => $rows.one({ id }) ?? null;

export async function add ({ name, password = '', url, username = '' }) {
  const trimmed = String(url ?? '').trim();
  if (!/^https?:\/\//i.test(trimmed)) throw new Error('The url has to start with http:// or https://');

  const connection = {
    id       : crypto.randomUUID(),
    name     : String(name ?? '').trim() || new URL(trimmed).host,
    password,
    url      : trimmed,
    username : String(username).trim(),
  };

  await test(connection);
  $rows.push(connection);
  return connection;
}

export function remove (id) {
  $rows.drop({ id });
  roots.delete(id);
}

export function rootOf (id) {
  const connection = byId(id);
  if (!connection) return null;
  if (!roots.has(id)) roots.set(id, davRoot(connection));
  return roots.get(id);
}
