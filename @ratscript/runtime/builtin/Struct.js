// @ratscript/runtime/types/Struct.js

import Enum   from './Enum.js';
import Record from './Record.js';

// Helpers
const isRecord = sth => Record.isRecord(sth);
const isString = sth => typeof sth === 'string';
const isStruct = sth => Enum.isEnum(sth);
const isObject = sth => typeof sth === 'object';
  
export default class Struct {

  // init
  constructor (schema) {
    this.schema = schema;
    this._keys  = Object.keys(schema);
    Object.freeze(this);
  }

  keys () {
    return [...this._keys];
  }

  defaults () {
    const result = {};
    for (let key of this._keys) {
      const def = this.schema[key];

      if (typeof def === "object" && def.default !== undefined) {
        result[key] = def.default;
      }
    }
    return result;
  }

  validate (values) {
    for (let key of this._keys) {
      const def   = this.schema[key];
      const value = values[key];

      // optional field
      if (typeof def === 'object' && def.optional && value === undefined) {
        continue;
      }

      // missing required field
      if (value === undefined && (!def.optional && def.default === undefined)) {
        throw new Error(`Missing required field: ${key}`);
      }

      // primitive type
      if (typeof def === 'string') {
        if (typeof value !== def) throw new TypeError(`Field ${key} must be ${def}, got ${typeof value}`);
        continue;
      }

      // enum type
      if (def instanceof Enum) {
        if (!def.isEnumValue(value)) throw new TypeError(`Field ${key} must be an enum value of ${def}`);
        continue;
      }

      // nested struct
      if (def instanceof Struct) {
        if (!(value instanceof Record) || value.struct !== def) {
          throw new TypeError(`Field ${key} must be a Record of Struct ${def}`);
        }
        continue;
      }

      // object schema: { type, default, optional }
      if (typeof def === 'object') {
        const type = def.type;

        if (value === undefined && def.default !== undefined) {
          continue; // default will be applied in create()
        }

        if (typeof type === 'string') {
          if (typeof value !== type) {
            throw new TypeError(`Field ${key} must be ${type}, got ${typeof value}`);
          }
        }

        if (type instanceof Enum) {
          if (!type.isEnumValue(value)) {
            throw new TypeError(`Field ${key} must be enum value of ${type}`);
          }
        }

        if (type instanceof Struct) {
          if (!(value instanceof Record) || value.struct !== type) {
            throw new TypeError(`Field ${key} must be Record of Struct ${type}`);
          }
        }

        continue;
      }

      throw new Error(`Invalid schema definition for field: ${key}`);
    }
  }

  create (values) {
    const merged = { ...this.defaults(), ...values };
    this.validate(merged);
    return new Record(this, merged);
  }

  // methods: static
  static isStruct (value) {
    return value instanceof Struct;
  }
  
};
