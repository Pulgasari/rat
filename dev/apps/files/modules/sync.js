// files :: modules/sync.js

/*
sending files to another device on the local network, LocalSend v2: any LocalSend app receives them, or
the filesync desktop daemon. the network part is native (the FileSync plugin of the android app): udp
multicast, http(s) to a lan address and a self-signed certificate are nothing a web page may do. so this
only works in the android app, available() says so.

  devices    the receivers discovery found, newest first
  targets    the receivers sent to before, kept across visits
  outbox     the files waiting to be sent: [{ mime, name, size, uri }]
  send(target, files)   one task in the 'send' lane, progress in bytes

a file of the folder becomes an outbox entry through its uri: the content:// uri an android folder handle
carries, or the file:// of a handle with a path. the receiver may want a pin: send() asks and tries once more.
*/

import { signal } from '@rat/signals';

import { read, write } from '../../.shared/storage.js';
import { dirAt }       from './fs.js';
import * as tasks      from './tasks.js';

const plugin = () => globalThis.Capacitor?.Plugins?.FileSync ?? null;

export const available = () => Boolean(plugin());

// :::::: STATE

export const PROTOCOLS = ['https', 'http'];

const PORT    = 53317;
const STORAGE = 'files:sync';
const stored  = read(STORAGE, {});

export const devices  = signal([]);
export const targets  = signal(Array.isArray(stored.targets) ? stored.targets : []);
export const outbox   = signal([]);
export const identity = signal(null);
export const autoSync = signal(null);   // the native service's state, null until read

// the native side keeps the auto sync folder as a uri only, its name is kept here
let folderName = stored.folderName ?? '';

const persist = () => write(STORAGE, { folderName, targets: targets.value });

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
  const rest = targets.value.filter(other => !sameTarget(other, target));
  targets.value = [{ alias: target.alias, fingerprint: target.fingerprint, host: target.host, port: target.port, protocol: target.protocol }, ...rest].slice(0, 8);
  persist();
}

export function forget (target) {
  targets.value = targets.value.filter(other => !sameTarget(other, target));
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
      devices.value = [device, ...devices.value.filter(other => (other.fingerprint || other.ip) !== key)];
    });
    identity.value = await native.getIdentity().catch(() => null);
  }

  await native.startDiscovery().catch(error => console.warn('[files] discovery failed', error));
  await refreshAutoSync();
}

export const stop = () => plugin()?.stopDiscovery().catch(() => {});

// :::::: OUTBOX

function add (files) {
  const known = new Set(outbox.value.map(file => file.uri));
  outbox.value = [...outbox.value, ...files.filter(file => file.uri && !known.has(file.uri))];
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

export const remove = uri => { outbox.value = outbox.value.filter(file => file.uri !== uri); };
export const clear  = () => { outbox.value = []; };

// :::::: SEND

const isPinError = error => error?.code === 'PIN_REQUIRED' || /\bpin\b/i.test(error?.message ?? '');

export function send (target, files = outbox.value, pin = '') {
  const native = plugin();
  if (!native || !target || !files.length) return Promise.resolve(null);

  const what = files.length === 1 ? files[0].name : `${files.length} files`;

  return tasks.run({ icon: 'lucide:send', label: `Send ${what} to ${labelOf(target)}`, lane: 'send' }, async ({ progress }) => {
    const listener = await native.addListener('progress', event => progress(event.sent, event.total));
    try {
      const attempt = secret => native.send({ files, fingerprint: target.fingerprint ?? '', host: target.host, pin: secret, port: target.port, protocol: target.protocol });
      try   { await attempt(pin); }
      catch (error) {
        if (!isPinError(error)) throw error;
        const asked = await RAT.app.dialogs.prompt({ message: `${labelOf(target)} wants a pin`, ok: 'Send', title: 'Pin' });
        if (!asked) throw new Error('no pin given');
        await attempt(asked);
      }
      remember(target);
      outbox.value = outbox.value.filter(file => !files.includes(file));
    }
    finally { listener.remove(); }
  });
}

// :::::: AUTO SYNC
// a folder of the device, sent on its own whenever new files show up and the phone is on wi-fi
// (optionally one network only). the native service runs without the app, this configures and reads it

export async function refreshAutoSync () {
  const state = await plugin()?.getAutoSyncState().catch(() => null) ?? null;
  autoSync.value = state && { ...state, name: state.tree ? folderName : '' };
}

export async function pickSyncFolder () {
  const { name, uri } = await plugin().pickFolder();
  if (!uri) return;
  folderName     = name ?? '';
  autoSync.value = { ...autoSync.value, name: folderName, tree: uri };
  persist();
}

export async function startAutoSync (target, { pin = '', ssid = '' } = {}) {
  const tree = autoSync.value?.tree;
  if (!tree) throw new Error('pick a folder first');
  await plugin().startAutoSync({ fingerprint: target.fingerprint ?? '', host: target.host, pin, port: target.port, protocol: target.protocol, ssid, tree });
  await refreshAutoSync();
}

export async function stopAutoSync () {
  await plugin().stopAutoSync();
  await refreshAutoSync();
}

export const syncNow = () => plugin()?.syncNow();
