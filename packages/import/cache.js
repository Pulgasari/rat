// @rat/import :: cache

/*
importFile() results, kept in indexeddb (memory where there is none) through
@bunker/policy, for settings.ttl unless a call brings its own.

  key       import:v1:<absolute url without query>:<query>:<options>
            every cache-busted variant of one file shares the prefix, so a set
            sweeps the expired ones of the same file along (not awaited)
  options   sorted, ttl and useCache left out: they steer the cache, they are
            not part of what was loaded. an option that cannot be written down
            (a compiler function) turns the cache off for that call
  values    plain data only. nodes, stylesheets, module namespaces, wasm modules
            and class instances are loaded fresh every time

a cached value is shared between callers: mutate a copy.
*/

import { BunkerDB, createDb } from '@bunker/db';
import { createPolicy }       from '@bunker/policy';

import { absolute, settings } from './core.js';
import { tokenOf }            from './modes.js';

const CONTROL   = new Set(['ttl', 'useCache']);
const LAYOUT    = 1; // bumped when the key layout changes, old entries then age out
const NAMESPACE = 'rat-import';

const onError = ({ error, key, operation }) => console.warn(`[@rat/import] could not ${operation} "${key}":`, error);
const driver  = BunkerDB.isSupported() ? createDb(NAMESPACE).driver('kv') : undefined;
const policy  = createPolicy({ driver, max: 256, maxEntries: 512, namespace: NAMESPACE, onError, version: 1 });

function fingerprint (options) {
  let out = '';
  for (const key of Object.keys(options).sort()) {
    let value = options[key];
    if (value === undefined || CONTROL.has(key)) continue;
    if (key === 'as') value = tokenOf(value);
    if (typeof value === 'function') return null;
    if (value !== null && typeof value === 'object') {
      try   { value = JSON.stringify(value); }
      catch { return null; }
    }
    out += `${key}=${value};`;
  }
  return out;
}

function isCacheable (value) {
  if (value === null || typeof value !== 'object') return typeof value !== 'function';
  if (value instanceof Date || value instanceof ArrayBuffer) return true;

  const prototype = Object.getPrototypeOf(value);
  if (!Array.isArray(value) && prototype !== Object.prototype && prototype !== null) return false;
  if (value[Symbol.toStringTag] === 'Module') return false;
  return !Object.values(value).some(member => typeof member === 'function');
}

export async function cached (path, options, load) {
  const id = options.useCache === false ? null : fingerprint(options);
  if (id === null) return load();

  const [resource, query = ''] = absolute(path).split(/[?#]/);
  const prefix = `import:v${LAYOUT}:${resource}:`;
  const key    = `${prefix}${query}:${id}`;

  // entry(), not get(): get() answers null for a miss and for a stored null alike
  const hit = await policy.entry(key);
  if (hit.state === 'fresh') return hit.value;

  const value = await load();
  if (!isCacheable(value)) return value;

  try {
    await policy.set(key, value, { ttl: options.ttl !== undefined ? options.ttl : settings.ttl });
    policy.prune(prefix).catch(() => {});
  }
  catch (error) { console.warn(`[@rat/import] could not cache "${resource}":`, error); }

  return value;
}
