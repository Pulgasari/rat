// downloader :: modules/grabber.js
// links come in as text: pasted, dropped, shared into the app. the grabber
// finds the urls, asks the plugins what each one is and groups what belongs
// together into packages. nothing starts here, the user looks first.
//
//   const found = await grab('https://a.org/x.part1.rar https://a.org/x.part2.rar');
//   -> [{ id, name: 'x', entries: [{ id, url, name, size, kind, hash, selected }] }]

import { signal } from '@rat/signals';

import { basename, resolve, urlsIn } from './plugins.js';

// the packages waiting in the grabber, before they start
export const found   = signal([]);
export const busy    = signal(false);
export const pending = signal(0);   // urls still being resolved

const uid = () => crypto.randomUUID?.() ?? Math.random().toString(36).slice(2);

// x.part1.rar, x.7z.001, x.zip.002, x.r00, x.rar: all 'x'
const ARCHIVE = /^(.*?)(\.part\d+\.rar|\.(?:7z|zip|tar)\.\d{3}|\.r\d{2}|\.rar|\.\d{3})$/i;

function groupOf (entry) {
  if (entry.group) return entry.group;
  const archive = ARCHIVE.exec(entry.name ?? '');
  if (archive) return archive[1];
  try   { return new URL(entry.url).hostname; }
  catch { return 'links'; }
}

// what the server says about a file, if it answers a HEAD across origins
export async function probe (url) {
  try {
    const response = await fetch(url, { method: 'HEAD', redirect: 'follow' });
    if (!response.ok) return {};
    const disposition = response.headers.get('content-disposition') ?? '';
    const named = /filename\*=UTF-8''([^;]+)|filename="?([^";]+)"?/i.exec(disposition);
    return {
      name : named ? decodeURIComponent(named[1] ?? named[2]) : null,
      size : Number(response.headers.get('content-length')) || null,
      type : response.headers.get('content-type'),
    };
  }
  catch { return {}; }
}

export async function grab (text) {
  const urls = urlsIn(text);
  if (!urls.length) return 0;

  busy.value    = true;
  pending.value = urls.length;
  const groups  = new Map(found.peek().map(item => [item.name, item]));

  try {
    await Promise.all(urls.map(async url => {
      let entries;
      try   { entries = await resolve(url); }
      catch (error) { entries = [{ error: error.message, name: basename(url), url }]; }

      for (const entry of entries) {
        const name = groupOf(entry);
        if (!groups.has(name)) groups.set(name, { entries: [], id: uid(), name });
        const group = groups.get(name);
        if (group.entries.some(item => item.url === entry.url)) continue;
        group.entries = [...group.entries, { id: uid(), selected: !entry.error, ...entry }];
      }
      pending.value--;
      found.value = [...groups.values()];
    }));
  }
  finally {
    busy.value    = false;
    pending.value = 0;
  }

  // sizes and names where the plugin knew none, in the background
  for (const group of found.peek()) {
    for (const entry of group.entries.filter(item => item.size == null && !item.kind && !item.error)) {
      probe(entry.url).then(info => {
        if (!info.size && !info.name) return;
        update(group.id, entry.id, { name: info.name ?? entry.name, size: info.size ?? entry.size });
      });
    }
  }
  return urls.length;
}

export function update (groupId, entryId, changes) {
  found.value = found.peek().map(group => group.id !== groupId ? group : {
    ...group,
    entries: entryId ? group.entries.map(entry => entry.id === entryId ? { ...entry, ...changes } : entry) : group.entries,
    ...(entryId ? {} : changes),
  });
}

export const drop  = groupId => { found.value = found.peek().filter(group => group.id !== groupId); };
export const clear = () => { found.value = []; };

export default { busy, clear, drop, found, grab, pending, probe, update };
