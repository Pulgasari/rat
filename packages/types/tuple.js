// @rat/types :: Tuple

/*
Tuple is a data type and, called, its schema:

  const Entry = Tuple(Str, Num);          // the schema: a string, then a number

  const entry = new Tuple('rat', 3);      // a tuple
  entry[0];                               // 'rat'
  const [name, count] = entry;            // destructures like an array
  entry.with(1, 4);                       // a new tuple: ('rat', 4)
  entry.equals(new Tuple('rat', 3));      // true

a tuple is frozen: fixed length, fixed values. a change is a new tuple, so
there is no reactive variant, a signal holding a tuple is reactive enough.
*/

import { Schema, typed } from './schema.js';

// ::: the schema

// an array or a Tuple of exactly these items, each checked and coerced
const tupleOf = (...items) => new Schema({
  describe : { items: items.map(item => item.describe) },
  initial  : items.map(item => item.initial),
  kind     : 'tuple',
  parts    : items,
  run      : (value, path) => {
    const tuple = value instanceof TupleType;
    if (!tuple && !Array.isArray(value)) return { issues: [{ message: 'expected a tuple', path }] };
    if (value.length !== items.length)   return { issues: [{ message: `expected ${items.length} items`, path }] };
    const issues = [];
    const out    = items.map((item, index) => {
      const result = item.validate(value[index], [...path, index]);
      if (result.issues) issues.push(...result.issues);
      return result.value;
    });
    if (issues.length) return { issues };
    if (!out.some((entry, index) => entry !== value[index])) return { value };
    return { value: tuple ? new TupleType(...out) : out };
  },
});

// ::: the data type

class TupleType {
  constructor (...items) {
    items.forEach((item, index) => { this[index] = item; });
    Object.defineProperty(this, 'length', { value: items.length });
    Object.freeze(this);
  }

  static from (items) { return new this(...items); }

  at (index) { return this[index < 0 ? this.length + index : index]; }

  equals (other) {
    if (!(other instanceof TupleType) || other.length !== this.length) return false;
    for (let index = 0; index < this.length; index++) if (!Object.is(this[index], other[index])) return false;
    return true;
  }

  with (index, value) {
    const items = [...this];
    items[index < 0 ? this.length + index : index] = value;
    return new this.constructor(...items);
  }

  toArray () { return [...this]; }
  toJSON  () { return this.toArray(); }

  * [Symbol.iterator] () { for (let index = 0; index < this.length; index++) yield this[index]; }
}

Object.defineProperty(TupleType, 'name', { value: 'Tuple' });

const Tuple = typed(TupleType, tupleOf);

// :::::: EXPORT

export { Tuple };
