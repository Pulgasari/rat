// @rat/types :: Id, Ref

/*
the keys of records, for @rat/bunker's tables:

  const Episodes = { id: Id, title: Str, podcast: Ref('podcasts') };

  Id            the primary key. missing on a write, the table makes one: a uuid
  Id.counter    the same, as numbers counting up (1, 2, 3 …): fine for data that
                stays on one device, they collide once records from two meet
  Ref('table')  the key of a record in another table: a string or a number

both are schemas only, a key is a plain string or number. Id is optional on
validation, the key is made after.
*/

import { Schema } from './schema.js';

const isKey = value => (typeof value === 'string' && value !== '') || Number.isInteger(value);

const key = (message, path) => value => isKey(value) ? { value } : { issues: [{ message, path }] };

class IdSchema extends Schema {
  get counter () { return this.derive({ describe: { counter: true } }); }

  // a new key: a uuid, or for a counter the one after the largest of keys
  make (keys = []) {
    if (!this.describe.counter) return crypto.randomUUID();
    return keys.reduce((max, current) => Number.isInteger(current) && current > max ? current : max, 0) + 1;
  }
}

const Id = new IdSchema({ initial: null, kind: 'id', nullable: true, run: (value, path) => key('a key', path)(value) });

const Ref = table => new Schema({ describe: { table }, initial: null, kind: 'ref', run: (value, path) => key(`a key of ${table}`, path)(value) });

// :::::: EXPORT

export { Id, Ref };
