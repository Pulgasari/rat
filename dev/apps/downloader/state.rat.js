// downloader :: state.rat.js

/*
what the views read: the downloads grouped into packages for the queue and the library, the totals,
the download in the context area. links come in here: pasted or dropped anywhere, or shared into the
app (the manifest's share_target).

  $queued, $library   [{ pack, rows }]: a package stays in the queue while one of its rows is not done
  $totals             { running, speed }
  $selected           the id of the download in the context area
*/

import * as engine  from './modules/engine.js';
import * as grabber from './modules/grabber.js';

const { router } = RAT.app;

// :::::: QUERIES

const byPackage = (rows, packages) => {
  const groups = new Map;
  for (const row of rows) {
    if (!groups.has(row.package)) groups.set(row.package, []);
    groups.get(row.package).push(row);
  }
  return [...groups]
    .map(([id, items]) => ({ pack: packages.find(item => item.id === id), rows: items.sort((a, b) => a.created - b.created) }))
    .sort((a, b) => (b.pack?.created ?? 0) - (a.pack?.created ?? 0));
};

const unfinished = (rows, row) => rows.some(item => item.package === row.package && item.state !== 'done');

const $rows     = engine.downloads.value;
const $packages = engine.packages.value;

export const $queued  = byPackage($rows.filter(row => unfinished($rows, row)), $packages);
export const $library = byPackage($rows.filter(row => row.state === 'done' && !unfinished($rows, row)), $packages);

export const $totals = {
  running : $rows.filter(row => row.state === 'running').length,
  speed   : Object.values(engine.live.value).reduce((sum, meter) => sum + (meter.speed ?? 0), 0),
};

// :::::: THE CONTEXT AREA

export let $selected = null;

export function inspect (id) {
  $selected = id;
  RAT.app.toggle('context', true);
}

export function closeDetail () {
  RAT.app.toggle('context', false);
  $selected = null;
}

// :::::: LINKS IN

export async function grabText (text) {
  const count = await grabber.grab(text);
  if (!count) throw new Error('no links in there');
  router.go('/grab');
  return count;
}

const typing = event => event.composedPath().some(node => node.localName === 'textarea' || node.localName === 'input' || node.isContentEditable);

document.addEventListener('paste', event => {
  if (typing(event)) return;
  const text = event.clipboardData?.getData('text');
  if (text) { event.preventDefault(); grabText(text); }
});

document.addEventListener('dragover', event => { if (event.dataTransfer?.types.some(type => type === 'text/uri-list' || type === 'text/plain')) event.preventDefault(); });
document.addEventListener('drop', event => {
  const text = event.dataTransfer?.getData('text/uri-list') || event.dataTransfer?.getData('text/plain');
  if (!text) return;
  event.preventDefault();
  grabText(text);
});

// shared into the app: the query of the page
export async function fromShare () {
  const params = new URLSearchParams(location.search);
  const text   = ['title', 'text', 'url'].map(key => params.get(key)).filter(Boolean).join(' ');
  if (!text) return;
  history.replaceState(null, '', location.pathname + location.hash);
  await grabText(text);
}

// :::::: COMMANDS, the hotkeys of config.rat.js fire them

RAT.app.commands.assign({
  'close'     : closeDetail,
  'grab'      : () => router.go('/grab'),
  'library'   : () => router.go('/library'),
  'pause-all' : () => engine.active.peek().forEach(row => engine.pause(row.id)),
  'queue'     : () => router.go('/'),
});
