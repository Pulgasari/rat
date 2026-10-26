// files :: modules/remotes.js

/*
the servers the app reaches besides the granted folder. webdav for now (nextcloud and owncloud speak
it): a connection becomes a root handle (.shared/webdav/handles.js), so a tab browses it like the
folder, and copy, move, preview and thumbnails work across both.

the connections, password included, stay on the device (RAT.app.files), sent only to their own server.
an app password is the better choice where the server has one.

  connections   [{ id, name, password, url, username }]
  add(fields)   tests the connection with a listing, then keeps it
  rootOf(id)    the root handle, one per connection
*/

import { signal } from '@rat/signals';

import { test }    from '../../.shared/webdav/client.js';
import { davRoot } from '../../.shared/webdav/handles.js';

const FILE  = 'remotes.json';
const roots = new Map;

export const connections = signal([]);

export async function load () { connections.value = await RAT.app.files.read(FILE, 'json').catch(() => []); }

const persist = () => RAT.app.files.write(FILE, JSON.stringify(connections.value));

export const byId = id => connections.value.find(connection => connection.id === id) ?? null;

export async function add ({ name, password = '', url, username = '' }) {
  const trimmed = String(url ?? '').trim();
  if (!/^https?:\/\//i.test(trimmed)) throw new Error('The url has to start with http:// or https://');

  const connection = {
    id       : `dav-${Date.now().toString(36)}`,
    name     : String(name ?? '').trim() || new URL(trimmed).host,
    password,
    url      : trimmed,
    username : String(username).trim(),
  };

  await test(connection);
  connections.value = [...connections.value, connection];
  await persist();
  return connection;
}

export async function remove (id) {
  connections.value = connections.value.filter(connection => connection.id !== id);
  roots.delete(id);
  await persist();
}

export function rootOf (id) {
  const connection = byId(id);
  if (!connection) return null;
  if (!roots.has(id)) roots.set(id, davRoot(connection));
  return roots.get(id);
}
