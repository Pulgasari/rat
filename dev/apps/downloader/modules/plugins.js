// downloader :: modules/plugins.js
// what a link is: a plugin matches urls and resolves one into the files behind
// it. the built-in ones run here, the user's own ones in a worker each
// (plugin-worker.js), loaded by url from the settings.
//
//   { name, match: url => bool, resolve: async (url, ctx) => [{ url, name, size, kind, hash, group }] }
//
// an entry without `kind` is a plain file, `kind: 'hls'` a playlist whose
// segments become one file. `group` puts entries into one package.
//
// ctx.text, ctx.json and ctx.fetch reach hosts without cors headers through
// .shared/js/modules/http.js: natively in the app, through the proxy in a browser.

import { getJson, getText, request } from '../../.shared/http.js';

// :::::: HELPERS :::::::::::::::::::::::::::::::::::::::::::::

export const basename = url => {
  try   { return decodeURIComponent(new URL(url).pathname.split('/').filter(Boolean).pop() ?? '') || new URL(url).hostname; }
  catch { return 'download'; }
};

export const URLS = /https?:\/\/[^\s"'<>()\[\]{}]+/gi;

// the urls in a text, without trailing punctuation, each once
export const urlsIn = text => [...new Set((String(text ?? '').match(URLS) ?? []).map(url => url.replace(/[.,;:!?]+$/, '')))];

export const ctx = {
  fetch : (url, init) => request(url, init),
  json  : url => getJson(url),
  text  : url => getText(url),
};

// :::::: BUILT IN ::::::::::::::::::::::::::::::::::::::::::::

const hls = {
  name    : 'hls',
  match   : url => /\.m3u8(\?|#|$)/i.test(url),
  resolve : async url => [{ kind: 'hls', name: basename(url).replace(/\.m3u8$/i, '') + '.ts', url }],
};

// a list of links: one per line, m3u comments skipped
const linkList = {
  name    : 'link list',
  match   : url => /\.(txt|m3u|list)(\?|#|$)/i.test(url),
  resolve : async (url, { text }) => {
    const base  = basename(url).replace(/\.[^.]+$/, '');
    const lines = (await text(url)).split(/\r?\n/).map(line => line.trim()).filter(line => line && !line.startsWith('#'));
    return lines.map(line => new URL(line, url).href).filter(link => /^https?:/.test(link)).map(link => ({ group: base, name: basename(link), url: link }));
  },
};

// an apache or nginx index page: its links to files
const directory = {
  name    : 'directory listing',
  match   : url => /\/$/.test(new URL(url).pathname) && new URL(url).pathname !== '/',
  resolve : async (url, { text }) => {
    const page = await text(url);
    if (!/<title>\s*index of/i.test(page)) return null;
    const document = new DOMParser().parseFromString(page, 'text/html');
    const group    = basename(url);
    return [...document.querySelectorAll('a[href]')]
      .map(link => link.getAttribute('href'))
      .filter(href => href && !href.startsWith('?') && !href.startsWith('#') && !href.startsWith('../') && !href.endsWith('/'))
      .map(href => new URL(href, url).href)
      .filter(link => link.startsWith(url))
      .map(link => ({ group, name: basename(link), url: link }));
  },
};

// github.com/<owner>/<repo>/releases[/tag/<tag>]: the assets of the release
const githubReleases = {
  name    : 'github releases',
  match   : url => /^https:\/\/github\.com\/[^/]+\/[^/]+\/releases/.test(url),
  resolve : async (url, { json }) => {
    const [, owner, repo, tag] = /github\.com\/([^/]+)\/([^/]+)\/releases(?:\/tag\/([^/?#]+))?/.exec(url);
    const release = await json(`https://api.github.com/repos/${owner}/${repo}/releases/${tag ? `tags/${tag}` : 'latest'}`);
    const group   = `${repo} ${release.tag_name}`;
    return release.assets.map(asset => ({ group, name: asset.name, size: asset.size, url: asset.browser_download_url }));
  },
};

// archive.org/details/<item>: the original files of the item
const archiveOrg = {
  name    : 'archive.org',
  match   : url => /^https:\/\/archive\.org\/details\/[^/?#]+/.test(url),
  resolve : async (url, { json }) => {
    const [, item] = /archive\.org\/details\/([^/?#]+)/.exec(url);
    const meta     = await json(`https://archive.org/metadata/${item}`);
    return (meta.files ?? [])
      .filter(file => file.source === 'original' && !/_meta\.|_files\.xml$/.test(file.name))
      .map(file => ({
        group : meta.metadata?.title ?? item,
        hash  : file.sha1 ? { algorithm: 'SHA-1', value: file.sha1 } : null,
        name  : file.name.split('/').pop(),
        size  : Number(file.size) || null,
        url   : `https://archive.org/download/${item}/${file.name.split('/').map(encodeURIComponent).join('/')}`,
      }));
  },
};

// a podcast or any rss/atom feed: its enclosures
const feed = {
  name    : 'feed',
  match   : url => /(\/feed\/?|\/rss\/?|\.rss|\.xml|[?&]format=rss)(\?|#|$)/i.test(url),
  resolve : async (url, { text }) => {
    const xml   = new DOMParser().parseFromString(await text(url), 'application/xml');
    const group = xml.querySelector('channel > title, feed > title')?.textContent.trim() || basename(url);
    const items = [...xml.querySelectorAll('item, entry')];
    const files = items.map(item => {
      const enclosure = item.querySelector('enclosure[url], link[rel="enclosure"][href]');
      if (!enclosure) return null;
      const link  = enclosure.getAttribute('url') ?? enclosure.getAttribute('href');
      const title = item.querySelector('title')?.textContent.trim();
      const ext   = basename(link).match(/\.[a-z0-9]+$/i)?.[0] ?? '';
      return { group, name: title ? `${title.replace(/[\\/:*?"<>|]+/g, ' ').trim()}${ext}` : basename(link), size: Number(enclosure.getAttribute('length')) || null, url: link };
    });
    return files.filter(Boolean);
  },
};

export const BUILT_IN = [hls, githubReleases, archiveOrg, linkList, feed, directory];

// :::::: USER PLUGINS ::::::::::::::::::::::::::::::::::::::::

// a plugin of the user, in a worker of its own. match runs in the worker too,
// so it is asked once per url and remembered
function workerPlugin (source) {
  const worker  = new Worker(new URL('./plugin-worker.js', import.meta.url), { type: 'module' });
  const pending = new Map;
  let counter   = 0;

  worker.addEventListener('message', ({ data }) => {
    if (data.type === 'request') return answer(data);
    const entry = pending.get(data.id);
    if (!entry) return;
    pending.delete(data.id);
    data.error ? entry.reject(new Error(data.error)) : entry.resolve(data.value);
  });

  // the worker's ctx calls come back here, to the transport of the app
  async function answer ({ id, method, url }) {
    try   { worker.postMessage({ id, type: 'answer', value: await ctx[method](url) }); }
    catch (error) { worker.postMessage({ error: error.message, id, type: 'answer' }); }
  }

  const call = (type, payload) => new Promise((resolve, reject) => {
    const id = ++counter;
    pending.set(id, { reject, resolve });
    worker.postMessage({ id, type, ...payload });
  });

  const ready = call('load', { source });

  return {
    name    : source,
    ready,
    match   : url => ready.then(() => call('match', { url })),
    resolve : url => call('resolve', { url }),
    stop    : () => worker.terminate(),
  };
}

let custom = [];

export function usePlugins (sources = []) {
  for (const plugin of custom) plugin.stop();
  custom = sources.filter(Boolean).map(workerPlugin);
  return Promise.allSettled(custom.map(plugin => plugin.ready));
}

// the files behind a url: the first plugin that matches and gives something,
// else the url itself
export async function resolve (url) {
  for (const plugin of [...custom, ...BUILT_IN]) {
    let matches = false;
    try   { matches = await plugin.match(url); }
    catch { continue; }
    if (!matches) continue;
    const entries = await plugin.resolve(url, ctx);
    if (entries?.length) return entries.map(entry => ({ ...entry, plugin: plugin.name }));
  }
  return [{ name: basename(url), url }];
}

export default { BUILT_IN, ctx, resolve, urlsIn, usePlugins };
