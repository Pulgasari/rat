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
