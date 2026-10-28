// apps/.shared/webdav/remotes.rat.js

/*
the servers an app reaches besides the granted folder (files, code). webdav for now (nextcloud and
owncloud speak it): a connection becomes a root handle (handles.js), so everything written against a
folder's handles (.shared/fs.js) works on a server as well.

the connections, password included, stay on the device (RAT.app.files), sent only to their own server.
an app password is the better choice where the server has one.

  $connections  [{ id, name, password, url, username }]
  add(fields)   tests the connection with a listing, then keeps it
  rootOf(id)    the root handle, one per connection
*/

// :::::: IMPORT

import { effect } from '@rat/signals';
import { $Table, Str } from '@rat/types';

import { test }    from './client.js';
import { davRoot } from './handles.js';

const { files } = RAT.app;

// ::::::

const FILE  = 'remotes.json';
const roots = new Map;   // id -> its root handle
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
