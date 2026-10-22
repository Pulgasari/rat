// @rat/types :: Enum

/*
Enum is a data type and, called, its schema:

  const View     = Enum('grid', 'list', 'masonry');      // the schema: one of them, 'grid' first
  const viewmode = new Enum('grid', 'list', 'masonry');  // a value: holds one of them
  const other    = new Enum(View);                       // the same, from the schema
  const copy     = new Enum(viewmode);                   // a copy, at viewmode's value

  viewmode.value;     // 'grid'
  viewmode.cycle();   // 'list', then 'masonry', then 'grid' again
  viewmode.value = 'table';   // TypeError: one of grid, list, masonry

$Enum, its reactive variant, is in reactive.js.
*/

import { reactive, register } from '@rat/signals';
import { Schema, typed } from './schema.js';

// ::: the schema

// one value out of a fixed list, the first is the initial one
const enumOf = (...values) => new Schema({
  describe : { values },
  initial  : values[0],
  kind     : 'enum',
  run      : (value, path) => values.includes(value) ? { value } : { issues: [{ message: `one of ${values.map(String).join(', ')}`, path }] },
});

// ::: the data type

class EnumType {
  #index;

  // new Enum('a', 'b') or new Enum(schema), at the schema's initial value. new Enum(other): a copy, at its value
  constructor (...values) {
    const [first] = values;
    const copy    = values.length === 1 && first instanceof EnumType;
    const schema  = copy ? first.schema : values.length === 1 && first instanceof Schema ? first : enumOf(...values);
    if (schema.kind !== 'enum' || !schema.describe.values.length) throw new TypeError('[rat] an Enum needs values or an Enum schema');
    this.schema = schema;
    this.values = Object.freeze([...schema.describe.values]);
    this.#index = Math.max(0, this.values.indexOf(copy ? first.value : schema.initial));
  }

  get value () { return this.values[this.#index]; }
  set value (value) { this.#index = this.values.indexOf(this.schema.parse(value)); }

  // the next value, or the one step places on (-1: the previous), around the end
  cycle (step = 1) {
    const count = this.values.length;
    this.#index = ((this.#index + step) % count + count) % count;
    return this.value;
  }

  is (value) { return this.value === value; }

  toJSON   () { return this.value; }
  toString () { return String(this.value); }
  valueOf  () { return this.value; }
}

Object.defineProperty(EnumType, 'name', { value: 'Enum' });

// ::: Enum + $Enum

const Enum = typed(EnumType, enumOf);

const $Enum = reactive(Enum, {
  reads  : ['value', 'is', 'toJSON', 'toString', 'valueOf'],
  writes : {
    cycle : enumeration => enumeration.values.length > 1,
    value : (enumeration, value) => !enumeration.is(value),
  },
});

register(Enum, $Enum);

// :::::: EXPORT

export { Enum, $Enum };
