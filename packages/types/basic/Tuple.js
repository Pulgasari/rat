// @rat/types :: Tuple

// :::::: IMPORT

import { Schema, byParse, dataType, issue, partsIn, schemaOf } from './../schema.js';
import { isArray } from './../_shared.js';

// ::: SCHEMA

// an array or a Tuple of exactly these items, each checked and coerced, a Tuple out
function tupleOf (...given) {
  const items = given.map(schemaOf);
  return new Schema({
    describe : { items: items.map(item => item.describe) },
    initial  : items.map(item => item.initial),
    kind     : 'tuple',
    parts    : items,
    run      : (value, path) => {
      const tuple = value instanceof TupleType;
      
      if (!tuple && !isArray(value))     return issue('expected a tuple', path);
      if (value.length !== items.length) return issue(`expected ${items.length} items`, path);
      
      const result = partsIn(items.map((item, index) => [index, item, value[index]]), path);
      if (result.issues) return result;
      return { value: tuple && !result.changed ? value : new TupleType(...result.values) };
    },
  });
}

// ::: DATA TYPE

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

// ::: Tuple

// a value of the schema is a Tuple already: create() hands it on (a tuple never changes, sharing it is safe)
const Tuple = dataType(TupleType, tupleOf, { create: byParse, kind: 'tuple', name: 'Tuple' });

// :::::: EXPORT

export { Tuple };
