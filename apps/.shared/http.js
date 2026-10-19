// .shared/js/modules/http.js
// fetching from hosts that send no CORS headers (rss feeds, the itunes api,
// channel pages). two routes, picked by where the app runs:
//
//   capacitor  the native http plugin, which knows no CORS: straight to the url,
//              never through a proxy
//   browser    a direct fetch first, on any failure once more through the proxy
//              template, `{url}` replaced with the encoded url (a template
//              without it gets the url appended)
//
//   import { getText, getJson } from '/.shared/js/modules/http.js';
//   const xml  = await getText(feedUrl, { accept: 'application/rss+xml', proxy });
//   const data = await getJson(apiUrl, { signal });
//
// request() is for everything beyond a get: any method, headers and a body,
// answered with a fetch Response. in the capacitor wrapper it goes through the
// repo's own NativeHttp plugin (.github/capacitor/plugins/), which also carries
// the methods android's http stack refuses (webdav: PROPFIND, MKCOL, MOVE,
// COPY). in a browser it is fetch, cors and all, and there is no proxy for it:
// a proxy would see credentials and bodies.
//
//   const response = await request(url, { body, headers: { Depth: '1' }, method: 'PROPFIND' });
//
// the capacitor bridge is reached through globalThis.Capacitor, never imported,
// see modules/filesystem/platform.js

// :::::: CONSTANTS

const PROXY = 'https://api.allorigins.win/raw?url={url}';

// :::::: HELPERS

const nativeHttp = () => globalThis.Capacitor?.isNativePlatform?.() ? globalThis.Capacitor.Plugins?.CapacitorHttp ?? null : null;
const nativeRaw  = () => globalThis.Capacitor?.isNativePlatform?.() ? globalThis.Capacitor.Plugins?.NativeHttp ?? null : null;

// the bridge carries strings only, bodies go as base64
async function toBase64 (body) {
  if (body == null) return null;
  const bytes = new Uint8Array(body instanceof ArrayBuffer ? body : ArrayBuffer.isView(body) ? body.buffer : await new Blob([body]).arrayBuffer());
  let binary = '';
  for (let start = 0; start < bytes.length; start += 0x8000) binary += String.fromCharCode(...bytes.subarray(start, start + 0x8000));
  return btoa(binary);
}

const fromBase64 = data => Uint8Array.from(atob(data ?? ''), char => char.charCodeAt(0));

// a response without a body may not be given one, a fetch Response refuses it
const EMPTY = new Set([101, 204, 205, 304]);

// null without a template: the direct route is the only one then
function viaProxy (proxy, url) {
  const template = (proxy ?? '').trim();
  if (!template) return null;
  const encoded = encodeURIComponent(url);
  return template.includes('{url}') ? template.replaceAll('{url}', encoded) : template + encoded;
}

async function viaFetch (url, { accept, as, signal }) {
  const response = await fetch(url, { headers: accept ? { accept } : {}, redirect: 'follow', signal });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return as === 'json' ? response.json() : response.text();
}

async function viaNative (http, url, { accept, as }) {
  const response = await http.request({ headers: accept ? { accept } : {}, method: 'GET', responseType: as, url });
  if (response.status < 200 || response.status >= 300) throw new Error(`HTTP ${response.status}`);
  // json arrives parsed, unless the host sent it as text/plain
  return as === 'json' && typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
}

// :::::: MAIN

// an abort is the caller moving on, never a reason to try the proxy
async function get (url, { accept, as = 'text', proxy = PROXY, signal } = {}) {
  const http = nativeHttp();
  if (http) return viaNative(http, url, { accept, as });

  let directError;
  try         { return await viaFetch(url, { accept, as, signal }); }
  catch (error) {
    if (error.name === 'AbortError') throw error;
    directError = error;
  }

  const proxied = viaProxy(proxy, url);
  if (!proxied) throw new Error(`could not reach ${url} (${directError.message})`);

  try         { return await viaFetch(proxied, { accept, as, signal }); }
  catch (error) {
    if (error.name === 'AbortError') throw error;
    throw new Error(`could not reach ${url}, direct and through the proxy (${error.message})`);
  }
}

const getJson = (url, options = {}) => get(url, { accept: 'application/json', ...options, as: 'json' });
const getText = (url, options = {}) => get(url, { ...options, as: 'text' });

/** any method, any body, a fetch Response back: natively in the app, fetch in a browser */
async function request (url, { body, headers = {}, method = 'GET', signal, timeout } = {}) {
  const raw = nativeRaw();
  if (!raw) return fetch(url, { body, headers, method, signal });

  const answer = await raw.request({ body: await toBase64(body), headers, method, timeout, url });
  return new Response(EMPTY.has(answer.status) ? null : fromBase64(answer.data), {
    headers    : answer.headers,
    status     : answer.status,
    statusText : answer.statusText,
  });
}

// :::::: EXPORT

export { getJson, getText, PROXY, request, viaProxy };
