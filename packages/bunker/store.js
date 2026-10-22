// @rat/bunker :: store

/*
keys and values, the same for every driver:

  const prefs = createStore ({ driver: 'local', name: 'notes' });

  await prefs.set('theme', 'dark');
  await prefs.get('theme');           // 'dark', undefined without one
  await prefs.get('zoom', 100);       // a fallback
  await prefs.has('theme'); 
  await prefs.delete('theme');  
  await prefs.clear();
  await prefs.keys();
  await prefs.values();
  await prefs.entries();

  prefs.getSync('theme');         // a sync driver only (local, session, cookie, memory):
  prefs.setSync('theme', 'dark'); // read before the first paint
  
  prefs.on('change', ({ type, keys }) => …)  // returns its stop, another tab included where the driver can
  await prefs.as(Map)                        // see cast.js

schema: any standard schema (@rat/types, zod …) checks every value set,
a value that fails throws. 

codec: see codecs.js, the driver picks one.
*/

import { cast }     from './cast.js';
import { codecOf }  from './codecs.js';
import { driverOf } from './drivers.js';

class Store {
  #codec;
  #driver;
  #listeners = new Set;
  #schema;

  constructor ({ codec, driver = 'memory', schema = null, ...options } = {}) {
    this.#driver = driverOf(driver, options);
    if (!this.#driver) throw new TypeError(`[bunker] no driver "${driver}"`);
    this.#codec  = codecOf(codec, this.#driver);
    this.#schema = schema;
    this.#driver.watch?.(change => this.emit(change));
  }

  get driver () { return this.#driver; }
  get schema () { return this.#schema; }
  get sync   () { return this.#driver.sync; }

  // :::::: READ

  async get (key, fallback) {
    const stored = await this.#driver.get(key);
    return stored === undefined ? fallback : this.#codec.decode(stored);
  }

  async has  (key) { return (await this.#driver.get(key)) !== undefined; }
  async keys ()    { return [...await this.#driver.keys()]; }

  async values () {
    if (this.#driver.values) return Promise.all((await this.#driver.values()).map(stored => this.#codec.decode(stored)));
    return (await this.entries()).map(([, value]) => value);
  }

  async entries () {
    const keys = await this.keys();
    return Promise.all(keys.map(async key => [key, await this.get(key)]));
  }

  as (Type) { return cast(Type, this); }

  // :::::: WRITE

  async set (key, value) {
    value = this.check(value);
    await this.#driver.set(key, this.#codec.encode(value));
    this.emit({ keys: [key], type: 'set' });
    return value;
  }

  async delete (key) {
    await this.#driver.delete(key);
    this.emit({ keys: [key], type: 'delete' });
  }

  async clear () {
    await this.#driver.clear();
    this.emit({ keys: [], type: 'clear' });
  }

  // the value through the schema: what it makes of it, or a TypeError
  check (value) {
    if (!this.#schema) return value;
    const result = this.#schema['~standard'].validate(value);
    if (typeof result?.then === 'function') throw new TypeError('[bunker] an async schema can not check a value');
    if (result.issues) throw new TypeError(`[bunker] ${result.issues.map(issue => (issue.path?.length ? issue.path.join('.') + ': ' : '') + issue.message).join(', ')}`);
    return result.value;
  }

  // :::::: SYNC, a sync driver only

  #syncOnly (name) { if (!this.#driver.sync) throw new TypeError(`[bunker] ${name}(): the driver is not synchronous`); }

  getSync (key, fallback) {
    this.#syncOnly('getSync');
    const stored = this.#driver.get(key);
    return stored === undefined ? fallback : this.#codec.decode(stored);
  }

  setSync (key, value) {
    this.#syncOnly('setSync');
    value = this.check(value);
    this.#driver.set(key, this.#codec.encode(value));
    this.emit({ keys: [key], type: 'set' });
    return value;
  }

  deleteSync (key) {
    this.#syncOnly('deleteSync');
    this.#driver.delete(key);
    this.emit({ keys: [key], type: 'delete' });
  }

  keysSync () { this.#syncOnly('keysSync'); return [...this.#driver.keys()]; }

  // :::::: CHANGES

  on (type, fn) {
    if (type !== 'change') throw new TypeError(`[bunker] on(): no event "${type}", only "change"`);
    this.#listeners.add(fn);
    return () => this.#listeners.delete(fn);
  }

  emit (change) { for (const fn of this.#listeners) fn(change); }
}

// :::::: EXPORT

const createStore = options => new Store (options);

export { Store, createStore };
export default Store;
