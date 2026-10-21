// @rat/app :: sw

/*
the service worker of a rat app: it works offline once it was open, and
browsers offer to install it. a worker reaches only the pages below its own
folder, so an app has a sw.js of its own next to its page, one line:

  importScripts('../../packages/app/sw.js');

and asks for it in config.rat.js: mods: { offline: true }.

  files of the page's origin   network first, the cache when there is none:
                               an edit shows on the next load, offline the last one does
  files of other origins       the cache first, refreshed behind it: their urls
                               carry versions (esm.sh, cdns)
  a request for a fresh copy   (cache: 'reload' | 'no-cache', ?fresh) the network first
*/

const CACHE = 'rat:offline';

addEventListener('install',  () => skipWaiting());
addEventListener('activate', event => event.waitUntil(clients.claim()));

addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET' || !/^https?:/.test(request.url)) return;
  const own   = new URL(request.url).origin === location.origin;
  const fresh = request.cache === 'reload' || request.cache === 'no-cache';
  event.respondWith(own || fresh ? networkFirst(request) : cacheFirst(request, event));
});

const keep = (cache, request, response) => {
  if (response.ok || response.type === 'opaque') cache.put(request, response.clone()).catch(() => {});
  return response;
};

async function networkFirst (request) {
  const cache = await caches.open(CACHE);
  try { return keep(cache, request, await fetch(request)); }
  catch (error) {
    const hit = await cache.match(request);
    if (hit) return hit;
    throw error;
  }
}

async function cacheFirst (request, event) {
  const cache   = await caches.open(CACHE);
  const hit     = await cache.match(request);
  const network = fetch(request).then(response => keep(cache, request, response));
  if (!hit) return network;
  event.waitUntil(network.catch(() => {}));
  return hit;
}
