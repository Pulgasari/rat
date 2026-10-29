// @rat/types :: Num, $Num

/*
Num is a schema: the value is a plain, finite number. it reads numeric strings ('120' -> 120). $Num is
the reactive variant, an object with value and methods: a write is checked by the schema, a step stops
at its bounds, reads subscribe, writes notify.

  const Zoom = Num.range(50, 200).default(100);
  Num.int.parse('3');                               // 3

  const $zoom = new $Num(100, Num.range(50, 200));  // or new $Num(Num.range(50, 200)): at its initial value
  $zoom.inc(10);  $zoom.dec(10);
*/

import { reactive } from '@rat/signals';

import { GET, SET, Scalar, Schema, isString, scalar } from './schema.js';

// ::: SCHEMA

class NumSchema extends Schema {
  min   (min)      { return this.check(value => value >= min, `at least ${min}`, { min }); }
  max   (max)      { return this.check(value => value <= max, `at most ${max}`,  { max }); }
  range (min, max) { return this.min(min).max(max).derive({ initial: this.initial < min || this.initial > max ? min : this.initial }); }
  get int ()       { return this.check(Number.isInteger, 'an integer', { int: true }); }
}

const
isNum     = (value) => typeof value === 'number' && Number.isFinite(value),
isNumeric = (value) => isString(value) && value.trim() !== '' && !isNaN(value),
toNum     = (value) => isNumeric(value) ? Number(value) : value;

const Num = new NumSchema({ initial: 0, kind: 'num', run: scalar('a number', isNum, toNum) });

// ::: REACTIVE VARIANT

// a step stops at the bounds the schema describes (Num.min, .max, .range)
class NumType extends Scalar {
  constructor (value, schema) { super(value, schema, Num); }
  dec (step = 1) { return this.inc(-step); }
  inc (step = 1) {
    const { max = Infinity, min = -Infinity } = this.schema.describe;
    return this[SET](Math.min(max, Math.max(min, this[GET]() + step)));
  }
}

Object.defineProperty(NumType, 'name', { value: 'Num' });

const $Num = reactive(NumType, { reads: Scalar.reads, writes: { dec: true, inc: true, value: Scalar.changes } });

// :::::: EXPORT

export { $Num, Num, NumSchema };
