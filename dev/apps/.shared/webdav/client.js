// apps/.shared/webdav/client.js
//
// webdav over fetch, stateless: every call takes the connection it talks to.
// PROPFIND lists and stats, GET/PUT read and write, MKCOL/DELETE/MOVE/COPY do
// the rest, with http basic auth.
//
//   const connection = { url: 'https://cloud.example/remote.php/dav/files/me/', username, password };
//   await list(connection, 'photos');   // [{ isDir, lastModified, mime, name, path, size }]
//
// the requests go through request() of ../http.js. in the android app that
// is native and knows no cors, any server works. in a browser it is fetch: the
// server has to send cors headers (allow this origin, the webdav methods and the
// Authorization, Depth, Destination and Overwrite headers), as a self-hosted
// nextcloud/owncloud with cors on, `rclone serve webdav --cors` or a proxy that
// adds them. the big consumer clouds speak their own oauth apis instead.
//
// a path is relative to the connection's url, '/'-joined, '' for its root.

import { request as send } from '../http.js';

// :::::: URLS :::::::::::::::::::::::::::::::::::::::::::::::::

const authHeader = connection => 'Basic ' + btoa(unescape(encodeURIComponent(`${connection.username || ''}:${connection.password || ''}`)));
const encodePath = path => path.split('/').filter(Boolean).map(encodeURIComponent).join('/');
const baseUrl    = connection => connection.url.endsWith('/') ? connection.url : connection.url + '/';

export const join = (...parts) => parts.flatMap(part => String(part ?? '').split('/')).filter(Boolean).join('/');

export function urlFor (connection, path = '', isDir = false) {
  const url = new URL(encodePath(path), baseUrl(connection)).href;
  return isDir && !url.endsWith('/') ? url + '/' : url;
}

// :::::: REQUEST ::::::::::::::::::::::::::::::::::::::::::::::

const MESSAGES = {
  401 : 'Authentication failed, check the username and password.',
  403 : 'Forbidden, the account may lack permission here.',
  404 : 'Not found on the server.',
  405 : 'The server rejected the method, webdav may be off at this path.',
  412 : 'The target exists already.',
};

export class DavError extends Error {
  constructor (status, message) { super(message); this.status = status; this.name = status === 404 ? 'NotFoundError' : 'DavError'; }
}

export async function request (connection, path, { body, headers = {}, isDir = false, method = 'GET' } = {}) {
  if (!connection) throw new Error('No webdav connection.');

  let response;
  try   { response = await send(urlFor(connection, path, isDir), { body, headers: { Authorization: authHeader(connection), ...headers }, method }); }
  catch (err) {
    // natively there is no cors to blame, the message says what went wrong
    if (globalThis.Capacitor?.isNativePlatform?.()) throw new DavError(0, `Connection failed: ${err?.message ?? err}`);
    throw new DavError(0, 'Connection failed, the server must allow cors (Access-Control-Allow-Origin) and the webdav methods for browser access.');
  }

  if (!response.ok) throw new DavError(response.status, MESSAGES[response.status] ?? `${response.status} ${response.statusText}`);
  return response;
}

// :::::: PROPFIND :::::::::::::::::::::::::::::::::::::::::::::

const PROPFIND = '<?xml version="1.0" encoding="utf-8"?>'
  + '<d:propfind xmlns:d="DAV:"><d:prop>'
  + '<d:resourcetype/><d:getcontentlength/><d:getlastmodified/><d:getcontenttype/>'
  + '</d:prop></d:propfind>';

const DAV       = 'DAV:';
const firstText = (element, tag) => element.getElementsByTagNameNS(DAV, tag)[0]?.textContent ?? '';

async function propfind (connection, path, depth) {
  const response = await request(connection, path, {
    body    : PROPFIND,
    headers : { 'Content-Type': 'application/xml; charset=utf-8', Depth: String(depth) },
    isDir   : depth > 0,
    method  : 'PROPFIND',
  });

  const xml  = new DOMParser().parseFromString(await response.text(), 'application/xml');
  const base = new URL(baseUrl(connection)).pathname;
  const relative = href => {
    const pathname = decodeURIComponent(new URL(href, connection.url).pathname);
    return (pathname.startsWith(base) ? pathname.slice(base.length) : pathname).replace(/^\/+|\/+$/g, '');
  };

  return [...xml.getElementsByTagNameNS(DAV, 'response')].map(entry => {
    const path = relative(firstText(entry, 'href'));
    return {
      isDir        : entry.getElementsByTagNameNS(DAV, 'collection').length > 0,
      lastModified : Date.parse(firstText(entry, 'getlastmodified')) || 0,
      mime         : firstText(entry, 'getcontenttype'),
      name         : path.split('/').pop(),
      path,
      size         : Number(firstText(entry, 'getcontentlength')) || 0,
    };
  });
}

/** the children of a collection, folders first, each by name */
export async function list (connection, path = '') {
  const self    = join(path);
  const entries = (await propfind(connection, path, 1)).filter(entry => entry.path !== self);
  return entries.sort((a, b) => a.isDir === b.isDir ? a.name.localeCompare(b.name, undefined, { numeric: true }) : a.isDir ? -1 : 1);
}

/** one entry, or null when there is none */
export async function stat (connection, path) {
  try   { return (await propfind(connection, path, 0))[0] ?? null; }
  catch (err) { if (err.status === 404) return null; throw err; }
}

// :::::: READ AND WRITE ::::::::::::::::::::::::::::::::::::::::

export const read  = async (connection, path) => (await request(connection, path)).blob();
export const write = (connection, path, data) => request(connection, path, { body: data, headers: { 'Content-Type': 'application/octet-stream' }, method: 'PUT' });

export const mkcol  = (connection, path) => request(connection, path, { isDir: true, method: 'MKCOL' });
export const remove = (connection, path, isDir = false) => request(connection, path, { isDir, method: 'DELETE' });

const destination = (connection, to, isDir) => ({ Destination: urlFor(connection, to, isDir), Overwrite: 'F' });

export const move = (connection, from, to, isDir = false) => request(connection, from, { headers: destination(connection, to, isDir), isDir, method: 'MOVE' });
export const copy = (connection, from, to, isDir = false) => request(connection, from, { headers: destination(connection, to, isDir), isDir, method: 'COPY' });

/** a root listing proves url, auth and cors in one request */
export const test = connection => list(connection, '');
