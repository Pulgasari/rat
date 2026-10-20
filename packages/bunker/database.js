// @rat/bunker :: database

/*
tables of records, each table a store whose keys are the records' ids:

  const db = createDatabase({
    name   : 'podcasts',
    tables : {
      podcasts : { id: Id, title: String, url: URL },
      episodes : { id: Id, title: String, url: URL, podcast: Ref('podcasts') },
      progress : { id: Ref('episodes'), point: Number },
    },
  });

  const show = await db.podcasts.add({ title: 'rat talk', url: 'https://…' });   // gets its id
  await db.podcasts.get(show.id);
  await db.podcasts.update(show.id, { title: 'rat talks' });
  await db.podcasts.find({ title: 'rat talks' });    // a matcher object or a function
  await db.podcasts.count();
  db.table('podcasts')                                // the same as db.podcasts

a field is a schema (@rat/types: Str, Num, Enum …, any standard schema) or
String, Number, Boolean, URL, Object, Array for the plain ones. the field with
Id (or the first Ref, a record of one other record) is the key. without a key
field a record is stored under `id`, made as by Id.

driver: 'indexeddb' (default) puts every table into one IndexedDB database
`name`, any store driver works as well ('local', 'memory' …): a table is then
the keys under `name:table`.
*/

import { Bool, Id, Num, Record, Schema, Str } from '@rat/types';

import { Store } from './store.js';

const isUrl = value => { try { return Boolean(new URL(value)); } catch { return false; } };
const any   = new Schema({ initial: null, kind: 'any', nullable: true, run: value => ({ value }) });

// the plain types as schemas
const PLAIN = new Map([
  [Array,   any],
  [Boolean, Bool],
  [Number,  Num],
  [Object,  any],
  [String,  Str],
  [URL,     Str.check(isUrl, 'a url', { url: true })],
]);

const fieldOf = (name, spec) => {
  if (spec?.['~standard']) return spec;
  if (PLAIN.has(spec))     return PLAIN.get(spec);
  throw new TypeError(`[bunker] field ${name}: a schema, or String, Number, Boolean, URL, Object, Array`);
};

class Table extends Store {
  #key;
  #keySchema;

  // title: the table's name, options: those of its store
  constructor ({ fields = null, title, ...options }) {
    const shape = fields ? Object.fromEntries(Object.entries(fields).map(([field, spec]) => [field, fieldOf(field, spec)])) : null;
    super({ ...options, schema: shape ? Record(shape) : null });

    const [key, schema] = Object.entries(shape ?? {}).find(([, field]) => field.kind === 'id')
                       ?? Object.entries(shape ?? {}).find(([, field]) => field.kind === 'ref')
                       ?? ['id', Id];
    this.#key       = key;
    this.#keySchema = schema;
    this.name       = title;
  }

  get key () { return this.#key; }

  // a new record: its key made when it has none. put() replaces one under the same key
  async add (record) {
    const key = record[this.#key] ?? (this.#keySchema.make ? this.#keySchema.make(await this.keys()) : undefined);
    if (key == null) throw new TypeError(`[bunker] ${this.name}: a record needs its ${this.#key}`);
    return this.set(key, { ...record, [this.#key]: key });
  }

  put (record) { return this.add(record); }

  async update (key, patch) {
    const current = await this.get(key);
    if (current === undefined) throw new TypeError(`[bunker] ${this.name}: no record ${key}`);
    return this.set(key, { ...current, ...patch, [this.#key]: key });
  }

  // a function, or an object whose every key has to match
  async find (test) {
    const match = typeof test === 'function' ? test : record => Object.entries(test ?? {}).every(([field, value]) => Object.is(record[field], value));
    return (await this.values()).filter(match);
  }

  async count () { return (await this.keys()).length; }
}

class Database {
  #tables = new Map;

  constructor ({ driver = 'indexeddb', name = 'bunker', tables = {}, ...options } = {}) {
    this.name = name;
    for (const [table, fields] of Object.entries(tables)) {
      const store = driver === 'indexeddb' ? { driver, name, table } : { driver, name: `${name}:${table}` };
      const instance = new Table({ ...options, ...store, fields, title: table });
      this.#tables.set(table, instance);
      if (!(table in this)) Object.defineProperty(this, table, { enumerable: true, value: instance });
    }
  }

  get tables () { return [...this.#tables.keys()]; }

  table (name) {
    const table = this.#tables.get(name);
    if (!table) throw new TypeError(`[bunker] ${this.name}: no table "${name}"`);
    return table;
  }
}

const createDatabase = options => new Database(options);

// :::::: EXPORT

export { Database, Table, createDatabase };
