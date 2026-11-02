// @rat/types :: Enum, $Enum

// :::::: IMPORT

import { Schema, dataTypes, issue } from './../schema.js';

// ::: SCHEMA

// one value out of a fixed list, the first is the initial one
const enumOf = (...values) => new Schema({
  describe : { values },
  initial  : values[0],
  kind     : 'enum',
  run      : (value, path) => values.includes(value) ? { value } : issue(`one of ${values.map(String).join(', ')}`, path),
});

// ::: DATA TYPE

class EnumType {
  #index;

  // new Enum('a', 'b'), new Enum(schema, value?) at value or the schema's initial one, new Enum(other): a copy, at its value
  constructor (...values) {
    const [first, value] = values;
    const copy    = values.length === 1 && first instanceof EnumType;
    const schema  = copy ? first.schema : first instanceof Schema ? first : enumOf(...values);
    if (schema.kind !== 'enum' || !schema.describe.values.length) throw new TypeError('[rat] an Enum needs values or an Enum schema');
    this.schema = schema;
    this.values = Object.freeze([...schema.describe.values]);
    this.#index = Math.max(0, this.values.indexOf(copy ? first.value : schema.initial));
    if (!copy && first instanceof Schema && value !== undefined) this.value = value;
  }

  get value ()      { return this.values[this.#index]; }
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

// ::: Enum + $Enum

const [Enum, $Enum] = dataTypes(EnumType, enumOf, { kind: 'enum', name: 'Enum' });

// :::::: EXPORT

export { Enum, $Enum };
