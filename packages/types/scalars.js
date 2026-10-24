// @rat/types :: $Bool, $Num, $Str

/*
a boolean, a number, a string as an object with value, like $Enum: a write
is checked by the schema, reads subscribe, writes notify. a plain typed
signal (let $zoom = Num.range(50, 200)) only gets set, these have methods.

  const $open = new $Bool;                          // false
  $open.toggle();  $open.on();  $open.off();

  const $zoom = new $Num(100, Num.range(50, 200));  // or new $Num(Num.range(50, 200)): at its initial value
  $zoom.inc(10);   $zoom.dec(10);                   // stop at the bounds of the schema

  const $query = new $Str('');
  $query.clear();

  $zoom.value = 'big';   // TypeError: expected a number
  `${$zoom}`;            // '100': toString and valueOf give the value
*/

import { reactive } from '@rat/signals';
import { Bool, Num, Schema } from './schema.js';
import { Str }               from './Str.js';

const GET = Symbol('rat.scalar.get');
const SET = Symbol('rat.scalar.set');

class Scalar {
  #value;

  // (value), (value, schema) or (schema): at the schema's initial value
  constructor (value, schema, fallback) {
    if (value instanceof Schema) [value, schema] = [undefined, value];
    this.schema = schema ?? fallback;
    this.#value = this.schema.parse(value === undefined ? this.schema.initial : value);
  }

  [GET] ()      { return this.#value; }
  [SET] (value) { this.#value = this.schema.parse(value); return this.#value; }

  get value ()      { return this[GET](); }
  set value (value) { this[SET](value); }

  toJSON   () { return this[GET](); }
  toString () { return String(this[GET]()); }
  valueOf  () { return this[GET](); }
}

class BoolType extends Scalar {
  constructor (value, schema) { super(value, schema, Bool); }
  off    () { return this[SET](false); }
  on     () { return this[SET](true); }
  toggle () { return this[SET](!this[GET]()); }
}

// a step stops at the bounds the schema describes (Num.min, .max, .range)
class NumType extends Scalar {
  constructor (value, schema) { super(value, schema, Num); }
  dec (step = 1) { return this.inc(-step); }
  inc (step = 1) {
    const { max = Infinity, min = -Infinity } = this.schema.describe;
    return this[SET](Math.min(max, Math.max(min, this[GET]() + step)));
  }
}

class StrType extends Scalar {
  constructor (value, schema) { super(value, schema, Str); }
  clear () { return this[SET](''); }
}

for (const [Type, name] of [[BoolType, 'Bool'], [NumType, 'Num'], [StrType, 'Str']]) Object.defineProperty(Type, 'name', { value: name });

const READS   = ['value', 'toJSON', 'toString', 'valueOf'];
const changes = (scalar, value) => !Object.is(scalar[GET](), value);

const $Bool = reactive(BoolType, { reads: READS, writes: { off: scalar => scalar[GET]() !== false, on: scalar => scalar[GET]() !== true, toggle: true, value: changes } });
const $Num  = reactive(NumType,  { reads: READS, writes: { dec: true, inc: true, value: changes } });
const $Str  = reactive(StrType,  { reads: READS, writes: { clear: scalar => scalar[GET]() !== '', value: changes } });

// :::::: EXPORT

export { $Bool, $Num, $Str };
