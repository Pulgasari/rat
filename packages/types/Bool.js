// @rat/types :: Bool, $Bool

/*
Bool is a schema: the value is a plain boolean. it reads 'true', 'yes', 'on' and their opposites, in
any case. $Bool is the reactive variant, an object with value and methods: a write is checked by the
schema, reads subscribe, writes notify.

  const Visible = Bool.default(true);
  Bool.parse('Yes');               // true

  const $open = new $Bool;         // false
  $open.toggle();  $open.on();  $open.off();
*/

import { reactive } from '@rat/signals';

import { GET, SET, Scalar, Schema, isString, scalar } from './schema.js';

// ::: SCHEMA

const WORDS = { false: false, no: false, off: false, on: true, true: true, yes: true };

const
isBool = (value) => typeof value === 'boolean',
isWord = (value) => isString(value) && value.toLowerCase() in WORDS,
toBool = (value) => isWord(value) ? WORDS[value.toLowerCase()] : value;

const Bool = new Schema({ initial: false, kind: 'bool', run: scalar('a boolean', isBool, toBool) });

// ::: REACTIVE VARIANT

class BoolType extends Scalar {
  constructor (value, schema) { super(value, schema, Bool); }
  off    () { return this[SET](false); }
  on     () { return this[SET](true); }
  toggle () { return this[SET](!this[GET]()); }
}

Object.defineProperty(BoolType, 'name', { value: 'Bool' });

const $Bool = reactive(BoolType, {
  reads  : Scalar.reads,
  writes : { off: bool => bool[GET]() !== false, on: bool => bool[GET]() !== true, toggle: true, value: Scalar.changes },
});

// :::::: EXPORT

export { $Bool, Bool };
