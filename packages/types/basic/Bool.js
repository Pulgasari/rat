// @rat/types :: Bool, $Bool

import { reactive }            from '@rat/signals';
import { SET, Schema, scalar } from './../schema.js';
import { isBool, isString }    from './../_shared.js';

// ::: SCHEMA

const BOOL_WORDS = { false: false, no: false, off: false, on: true, true: true, yes: true };

const
isWord = (value) => isString(value) && value.toLowerCase() in BOOL_WORDS,
toBool = (value) => isWord(value) ? BOOL_WORDS[value.toLowerCase()] : value;

const Bool = new Schema({ initial: false, kind: 'bool', run: scalar('a boolean', isBool, toBool) });

// ::: REACTIVE VARIANT

class BoolType {
  #value;
  schema;

  constructor (value, schema = Bool) {
    this.schema = schema;
    this.#value = this.schema.parse(value === undefined ? this.schema.initial : value);
  }

  // Protocol method for @rat/signals
  [SET] (value) {
    return (this.#value = this.schema.parse(value));
  }

  get value ()      { return this.#value; }
  set value (value) { this[SET](value); }

  off    () { return this[SET](false); }
  on     () { return this[SET](true); }
  toggle () { return this[SET](!this.#value); }

  toJSON   () { return this.#value; }
  toString () { return String(this.#value); }
  valueOf  () { return this.#value; }
}

Object.defineProperty(BoolType, 'name', { value: 'Bool' });

const $Bool = reactive(BoolType);

export { $Bool, Bool };





/*
// @rat/types :: Bool, $Bool

// :::::: IMPORT

import { reactive } from '@rat/signals';
import { GET, SET, Scalar, Schema, scalar } from './../schema.js';
import { isBool, isString } from './../_shared.js';

// ::: SCHEMA

const BOOL_WORDS = { false: false, no: false, off: false, on: true, true: true, yes: true };

const
isWord = (value) => isString(value) && value.toLowerCase() in BOOL_WORDS,
toBool = (value) => isWord(value) ? BOOL_WORDS[value.toLowerCase()] : value;

const Bool = new Schema ({ initial: false, kind: 'bool', run: scalar('a boolean', isBool, toBool) });

// ::: REACTIVE VARIANT

class BoolType extends Scalar {
  constructor (value, schema) { super(value, schema, Bool); }
  off    () { return this[SET](false); }
  on     () { return this[SET](true); }
  toggle () { return this[SET](!this[GET]()); }
}

Object.defineProperty(BoolType, 'name', { value: 'Bool' });

const $Bool = reactive(BoolType);

// :::::: EXPORT

export { $Bool, Bool };
*/
