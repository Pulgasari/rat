// downloader :: sw.js, the service worker of the app (offline: true in config.rat.js)

// @rat/app :: sw

/*
the service worker of a rat app: it works offline once it was open, and
browsers offer to install it. a worker reaches only the pages below its own
folder, so an app has a sw.js of its own next to its page, one line:

  importScripts('../../packages/app/run/sw.js');

and asks for it in config.rat.js: offline: true.

  files with a version in their url   the cache first, refreshed behind it: the url changes
  (esm.sh/x@1.2, ?v=3)                with the content
  every other file                    network first, the cache when there is none: an edit
                                      shows on the next load (code.pulgasari.dev too), offline
                                      the last one does
  a request for a fresh copy          (cache: 'reload' | 'no-cache', ?fresh) the network first
*/

const CACHE = 'rat:offline';

addEventListener('install',  () => skipWaiting());
addEventListener('activate', event => event.waitUntil(clients.claim()));

addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET' || !/^https?:/.test(request.url)) return;
  const versioned = /@\d|[?&]v=/.test(request.url);
  const fresh     = request.cache === 'reload' || request.cache === 'no-cache';
  event.respondWith(versioned && !fresh ? cacheFirst(request, event) : networkFirst(request));
});

// an opaque response (from a no-cors request: <img>, background-image) is no answer to a cors one
// (mask-image, fetch): the browser drops it, an icon masked by it is not there
const fits = (response, request) => !!response && (response.type !== 'opaque' || request.mode === 'no-cors');

const keep = (cache, request, response) => {
  if (response.ok || response.type === 'opaque') cache.put(request, response.clone()).catch(() => {});
  return response;
};

async function networkFirst (request) {
  const cache = await caches.open(CACHE);
  try { return keep(cache, request, await fetch(request)); }
  catch (error) {
    const hit = await cache.match(request);
    if (fits(hit, request)) return hit;
    throw error;
  }
}

async function cacheFirst (request, event) {
  const cache   = await caches.open(CACHE);
  const hit     = await cache.match(request);
  const network = fetch(request).then(response => keep(cache, request, response));
  if (!fits(hit, request)) return network;
  event.waitUntil(network.catch(() => {}));
  return hit;
}

