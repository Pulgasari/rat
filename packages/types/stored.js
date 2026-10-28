// @rat/types :: stored

/*
a value kept beyond the page: read back when it is made, written on every change. one word, three
ways to say it:

  // the primitive: a key and a value
  let   $theme = stored('theme', Enum('zombie', 'oled', 'rainbow'));    // a signal
  const $tabs  = stored('tabs', $List(Tab).create());                  // the variant itself, kept

  // on the schema: the options travel with the type
  let   $theme    = Enum.from(gestalt.themes).stored({ key: 'look', in: 'session' });   // $() makes the signal
  const $settings = $Record(Settings).stored('settings').create();                     // create() the variant

  // in a declaration, the compiler: the key is the name
  let   $theme!    = Enum('zombie', 'oled', 'rainbow');   // stored('theme', Enum(…))
  const $settings! = $Record(Settings).create();           // stored('settings', $Record(Settings).create())

options, a key or
  key        what it is kept under. a key written on the schema wins over the one of the call
  in         the place, see below
  debounce   ms after a change before it is written, default: once per microtask
  sync       true: a change from elsewhere (another tab) comes in
  version    the version of the shape. what was kept under another goes through migrate
  migrate    (old, version) -> the value in today's shape, undefined drops it

the place: the call, else the type (a Table is many rows: 'database'), else stored.defaults.in
(config.rat.js: stored: { in }), else 'store'. a place is { peek (key) | get (key), set (key, value),
delete (key), on? ('change', fn), load? (), loaded?, sync? }, a @rat/bunker store is one.
without @rat/app 'store' is localStorage, 'session' sessionStorage, 'memory' a Map; @rat/app puts
RAT.app.store there, read ahead, and a store in the app's database as 'database'.

a place that answers at once (peek) gives the value before anything reads it. any other answers once it
can; a change made before that wins. what is read goes through the schema: coerced, what is missing at
its initial value, a field that no longer fits as well. what is written is what toJSON gives.

the same key in the same place twice is the same signal. a variant can not be shared that way: the second
one is kept as well, and warned about.
*/

import { REACTIVE, Signal, batch, effect, isSignal, untrack, $ } from '@rat/signals';
import { STORED, isObject, isSchema, madeBy } from './schema.js';

const VERSION = '~version';

// :::::: PLACES

const memory = () => {
  const map = new Map;
  return {
    delete : key          => { map.delete(key); },
    peek   : key          => map.get(key),
    set    : (key, value) => { map.set(key, value); },
  };
};

const webStorage = area => ({
  delete : key          => globalThis[area]?.removeItem(key),
  peek   : key          => { try { return JSON.parse(globalThis[area]?.getItem(key) ?? 'null') ?? undefined; } catch { return undefined; } },
  set    : (key, value) => globalThis[area]?.setItem(key, JSON.stringify(value)),

  on (type, fn) {
    const listener = event => {
      if (event.storageArea !== globalThis[area]) return;
      fn({ keys: event.key === null ? [] : [event.key], type: event.key === null ? 'clear' : event.newValue === null ? 'delete' : 'set' });
    };
    addEventListener('storage', listener);
    return () => removeEventListener('storage', listener);
  },
});

const places   = { memory: memory(), session: webStorage('sessionStorage'), store: webStorage('localStorage') };
const defaults = { in: null };
const instead  = { database: 'store' };   // a place nobody set up -> where it goes meanwhile

function placeOf (name) {
  if (places[name]) return places[name];
  if (!instead[name]) throw new TypeError(`[rat] stored: no place "${name}", ${Object.keys(places).join(', ')} are`);
  console.warn(`[rat] stored: no place "${name}", kept in "${instead[name]}"`);
  return placeOf(instead[name]);
}

const placeFor = (options, schema) => options.in ?? (schema?.kind === 'table' ? 'database' : null) ?? defaults.in ?? 'store';

// answers at once: from memory after load(), or a sync driver
const answers = place => typeof place.peek === 'function' && (place.loaded !== false || place.sync === true);

// :::::: READ

// the value in the schema's form. a record takes field by field, what does not fit stays initial
function fit (schema, value) {
  if (!schema) return value;
  if (schema.kind === 'record' && isObject(value)) {
    return Object.fromEntries(Object.entries(schema.parts).map(([key, part]) => {
      const result = key in value ? part.validate(value[key]) : null;
      return [key, result && !result.issues ? result.value : part.initial];
    }));
  }
  const result = schema.validate(value);
  if (result.issues) { console.warn(`[rat] stored: dropped, ${result.issues.map(issue => issue.message).join(', ')}`); return undefined; }
  // items that are a data type of their own (a $Record) come back as one
  const item = schema.kind === 'list' ? schema.parts?.item : null;
  return item?.factory ? result.value.map(entry => item.create(entry)) : result.value;
}

// a variant takes the value in place
function restore (target, value) {
  if (typeof target.assign === 'function')  return target.assign(Object.fromEntries(Object.keys(target).filter(key => key in value).map(key => [key, value[key]])));
  if (typeof target.replace === 'function') return target.replace(value);
  if (Array.isArray(target))                return target.splice(0, target.length, ...value);
  if (target instanceof Map)                { target.clear(); for (const [key, entry] of Object.entries(value)) target.set(key, entry); return; }
  if (target instanceof Set)                { target.clear(); for (const entry of value) target.add(entry); return; }
  target.value = value;
}

// :::::: WRITE

const pending = new Map;   // place:key -> its write, until it has run

function flush () { for (const write of [...pending.values()]) write(); }

globalThis.addEventListener?.('pagehide', flush);
globalThis.document?.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') flush(); });

// :::::: KEEP

const kept    = new Map;       // place:key -> { signal, target, reset }
const targets = new WeakSet;   // the variants kept, a second stored() leaves them as they are

const optionsOf = options => typeof options === 'string' ? { key: options } : { ...options };

function stored (options, init) {
  const given  = optionsOf(options);
  const schema = isSchema(init) ? init : init !== null && typeof init === 'object' ? madeBy(init) ?? init.schema : undefined;
  const own    = schema?.[STORED] ?? null;
  return keep({ ...own, ...given, key: own?.key ?? given.key }, init, schema);
}

function keep (options, init, schema) {
  const { debounce = 0, key, migrate, sync = false, version } = options;
  if (!key) throw new TypeError('[rat] stored: a key, written or from the name');

  const name   = placeFor(options, schema);
  const place  = placeOf(name);
  const id     = `${name}:${key}`;
  const known  = kept.get(id);
  const valued = !isSchema(init) && init?.[REACTIVE] === true && !isSignal(init);   // a variant, kept in place

  if (targets.has(init)) return init;
  if (known?.signal && !valued) return known.signal;
  if (known) console.warn(`[rat] stored: "${key}" in "${name}" is kept twice, both write it`);

  const signal = valued ? null : isSignal(init) ? init : isSchema(init) ? new Signal(init) : $(init);
  const target = signal ?? init;

  const json    = () => JSON.stringify(signal ? signal.value : target);   // tracked: whatever changes it
  const initial = untrack(() => signal ? signal.value : JSON.parse(json() ?? 'null'));

  let last    = untrack(json);
  let ready   = false;
  let touched = false;
  let timer   = null;

  // ::: in

  function decode (raw) {
    if (raw === undefined) return { value: undefined };
    if (version === undefined) return { value: fit(schema, raw) };
    if (raw?.[VERSION] === version) return { value: fit(schema, raw.value) };
    if (!migrate) return { value: undefined };
    const old = raw?.[VERSION] !== undefined ? raw.value : raw;
    return { migrated: true, value: fit(schema, migrate(old, raw?.[VERSION] ?? 0)) };
  }

  function apply (value) {
    if (value === undefined || JSON.stringify(value) === last) return;
    batch(() => { if (signal) signal.value = value; else restore(target, value); });
    last = untrack(json);
  }

  function take (raw) {
    const { migrated, value } = decode(raw);
    apply(value);
    if (migrated) schedule();
  }

  const read = () => answers(place) ? place.peek(key) : Promise.resolve(place.load?.()).then(() => answers(place) ? place.peek(key) : place.get(key));

  // ::: out

  function write () {
    clearTimeout(timer);
    timer = null;
    pending.delete(id);
    const text = untrack(json);
    if (text === undefined) return place.delete(key);
    const value = JSON.parse(text);
    return place.set(key, version === undefined ? value : { [VERSION]: version, value });
  }

  function schedule () {
    if (!ready) { touched = true; return; }
    pending.set(id, write);
    if (debounce) { clearTimeout(timer); timer = setTimeout(write, debounce); }
    else if (!timer) { timer = true; queueMicrotask(() => { if (timer === true) write(); }); }
  }

  // ::: start

  const raw = read();
  if (raw instanceof Promise) {
    raw.then(found => { if (!touched) take(found); }, error => console.warn(`[rat] stored: "${key}" not read`, error))
      .finally(() => { ready = true; if (touched) schedule(); });
  }
  else {
    take(raw);
    ready = true;
  }

  // no owner: it lives as long as the key, a component that made it may be gone
  effect(() => {
    const text = json();
    if (text === last) return;
    last = text;
    schedule();
  }, null);

  if (sync) place.on?.('change', async ({ keys, type }) => {
    if (type !== 'clear' && !keys.includes(key)) return;
    const found = await read();
    if (found === undefined) reset();
    else take(found);
  });

  function reset () {
    clearTimeout(timer);
    timer = null;
    pending.delete(id);
    batch(() => { if (signal) signal.value = initial; else restore(target, fit(schema, initial)); });
    last = untrack(json);
  }

  kept.set(id, { signal, target, reset: () => { reset(); return place.delete(key); } });
  if (!signal) targets.add(target);
  return target;
}

// back to its initial value, and gone from its place. in: the place, else every place it is kept in
stored.forget = (key, { in: name } = {}) => Promise.all([...kept].filter(([id]) => name ? id === `${name}:${key}` : id.endsWith(`:${key}`)).map(([, entry]) => entry.reset()));

stored.place = (name, place) => { places[name] = place; };

stored.defaults = defaults;
stored.flush    = flush;

// :::::: EXPORT

export { stored };
