// files :: modules/sync.rat.js

/*
sending files to another device on the local network, LocalSend v2: any LocalSend app receives them, or
the filesync desktop daemon. the network part is native (the FileSync plugin of the android app): udp
multicast, http(s) to a lan address and a self-signed certificate are nothing a web page may do. so this
only works in the android app, available() says so.

  $devices    the receivers discovery found, newest first
  $targets    the receivers sent to before, kept across visits
  $outbox     the files waiting to be sent: [{ mime, name, size, uri }]
  $identity   this device as the network sees it
  $autoSync   the native auto sync service's state, null until read
  send(target, files)   one task in the 'send' lane, progress in bytes

a file of the folder becomes an outbox entry through its uri: the content:// uri an android folder handle
carries, or the file:// of a handle with a path. the receiver may want a pin: send() asks and tries once more.
*/

import { read, write } from '../../.shared/storage.js';
import { dirAt }       from './fs.js';
import { run }         from './tasks.rat.js';

const { dialogs } = RAT.app;

const plugin = () => globalThis.Capacitor?.Plugins?.FileSync ?? null;

export const available = () => Boolean(plugin());

// :::::: STATE

export const PROTOCOLS = ['https', 'http'];

const PORT    = 53317;
const STORAGE = 'files:sync';
const stored  = read(STORAGE, {});

export let $autoSync = null;
export let $devices  = [];
export let $identity = null;
export let $outbox   = [];
export let $targets  = Array.isArray(stored.targets) ? stored.targets : [];

// the native side keeps the auto sync folder as a uri only, its name is kept here
let folderName = stored.folderName ?? '';

const persist = () => write(STORAGE, { folderName, targets: $targets });

// :::::: TARGETS

// what was typed: an address with or without a port, or the filesync:// uri the desktop shows (it
// carries protocol and fingerprint). null when there is nothing to send to
export function parseTarget (raw, protocol = 'https') {
  const text = String(raw ?? '').trim();
  if (!text) return null;

  if (text.includes('://')) {
    try {
      const url = new URL(text.replace(/^filesync:\/\//, 'http://'));
      const own = url.searchParams.get('protocol');
      return { fingerprint: url.searchParams.get('fingerprint') ?? '', host: url.hostname, port: Number(url.port) || PORT, protocol: PROTOCOLS.includes(own) ? own : protocol };
    }
    catch { return null; }
  }

  const [host, port] = text.split(':');
  return { fingerprint: '', host, port: Number(port) || PORT, protocol };
}

export const labelOf = target => target.alias ?? `${target.host}:${target.port}`;

const sameTarget = (a, b) => a.host === b.host && a.port === b.port;

function remember (target) {
  const rest = $targets.filter(other => !sameTarget(other, target));
  $targets = [{ alias: target.alias, fingerprint: target.fingerprint, host: target.host, port: target.port, protocol: target.protocol }, ...rest].slice(0, 8);
  persist();
}

export function forget (target) {
  $targets = $targets.filter(other => !sameTarget(other, target));
  persist();
}

// :::::: DISCOVERY, while the view is on screen: it costs battery

let listening = false;

export async function start () {
  const native = plugin();
  if (!native) return;

  if (!listening) {
    listening = true;
    native.addListener('device', device => {
      if (!device?.ip) return;
      const key = device.fingerprint || device.ip;
      $devices = [device, ...$devices.filter(other => (other.fingerprint || other.ip) !== key)];
    });
    $identity = await native.getIdentity().catch(() => null);
  }

  await native.startDiscovery().catch(error => console.warn('[files] discovery failed', error));
  await refreshAutoSync();
}

export const stop = () => plugin()?.stopDiscovery().catch(() => {});

// :::::: OUTBOX

function add (files) {
  const known = new Set($outbox.map(file => file.uri));
  $outbox = [...$outbox, ...files.filter(file => file.uri && !known.has(file.uri))];
}

export async function pickFiles () {
  const { files = [] } = await plugin().pickFiles();
  add(files);
}

// a file of the folder on this device, by the uri its handle carries
export async function addEntry (root, path, entry) {
  const handle = await (await dirAt(root, path)).getFileHandle(entry.name);
  const uri    = handle._uri ?? (handle.path ? `file://${handle.path}` : null);
  if (!uri) throw new Error('only files of the folder on this device can be sent');
  add([{ mime: entry.type || 'application/octet-stream', name: entry.name, size: entry.size ?? -1, uri }]);
}

export const remove = uri => { $outbox = $outbox.filter(file => file.uri !== uri); };
export const clear  = () => { $outbox = []; };

// :::::: SEND

const isPinError = error => error?.code === 'PIN_REQUIRED' || /\bpin\b/i.test(error?.message ?? '');

export function send (target, files = $outbox, pin = '') {
  const native = plugin();
  if (!native || !target || !files.length) return Promise.resolve(null);

  const what = files.length === 1 ? files[0].name : `${files.length} files`;

  return run({ icon: 'lucide:send', label: `Send ${what} to ${labelOf(target)}`, lane: 'send' }, async ({ progress }) => {
    const listener = await native.addListener('progress', event => progress(event.sent, event.total));
    try {
      const attempt = secret => native.send({ files, fingerprint: target.fingerprint ?? '', host: target.host, pin: secret, port: target.port, protocol: target.protocol });
      try   { await attempt(pin); }
      catch (error) {
        if (!isPinError(error)) throw error;
        const asked = await dialogs.prompt({ message: `${labelOf(target)} wants a pin`, ok: 'Send', title: 'Pin' });
        if (!asked) throw new Error('no pin given');
        await attempt(asked);
      }
      remember(target);
      $outbox = $outbox.filter(file => !files.includes(file));
    }
    finally { listener.remove(); }
  });
}

// :::::: AUTO SYNC
// a folder of the device, sent on its own whenever new files show up and the phone is on wi-fi
// (optionally one network only). the native service runs without the app, this configures and reads it

export async function refreshAutoSync () {
  const state = await plugin()?.getAutoSyncState().catch(() => null) ?? null;
  $autoSync = state && { ...state, name: state.tree ? folderName : '' };
}

export async function pickSyncFolder () {
  const { name, uri } = await plugin().pickFolder();
  if (!uri) return;
  folderName = name ?? '';
  $autoSync  = { ...$autoSync, name: folderName, tree: uri };
  persist();
}

export async function startAutoSync (target, { pin = '', ssid = '' } = {}) {
  const tree = $autoSync?.tree;
  if (!tree) throw new Error('pick a folder first');
  await plugin().startAutoSync({ fingerprint: target.fingerprint ?? '', host: target.host, pin, port: target.port, protocol: target.protocol, ssid, tree });
  await refreshAutoSync();
}

export async function stopAutoSync () {
  await plugin().stopAutoSync();
  await refreshAutoSync();
}

export const syncNow = () => plugin()?.syncNow();
