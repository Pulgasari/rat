// @rat/types :: schema

// :::::: IMPORT

import { SET, SIGNAL, STORED, Signal, reactive, register, stored } from '@rat/signals';
import { isFn, isObject, isSchema, isString } from './_shared.js';

// :::::: CONSTANTS | REFERENCES | SYMBOLS

const // symbols
BARE   = Symbol('rat.bare'),
GET    = Symbol('rat.scalar.get'); // SET (a write by name) and STORED come from @rat/signals

const bare          = (Type)  => Object.defineProperty(Type, BARE, { value: true });
const byConstructor = (Type, schema, value) => new Type (schema, value);
const byParse       = (Type, schema, value = schema.initial) => schema.parse(value); // create() of a type whose schema gives its values already (Segments, Path …)
const issue         = (message, path) => ({ issues: [{ message, path }] }); // one issue as a result: return issue('expected a list', path)
const schemaOf      = (value)         => isFn(value) && value[BARE] ? value() : value;

// :::::: SCHEMA

class Schema {
  constructor ({
    checks    = [],
    describe  = {}, 
    factory   = null, 
    nullable  = false, 
    parts     = null,
    transform = null,
    [STORED]: kept = null,
    initial, kind, run,
  }) {
    Object.assign(this, { 
      checks, factory, initial, kind, nullable, parts, run, transform,
      describe: { kind, ...describe }, 
      [STORED]: kept 
    });
    Object.freeze(this);
  }

  // a further condition: check(value => value % 2 === 0, 'even')
  check (fn, message = 'check failed', describe = {}) { return this.derive({ checks: [...this.checks, [fn, message]], describe }); }

  is       (value)        { return !this.validate(value).issues; }
  derive   (patch)        { return new this.constructor({ ...this, ...patch, describe: { ...this.describe, ...patch.describe } }); }
  default  (value)        { return this.derive({ describe: { initial: value }, initial: value }); }
  optional ()             { return this.derive({ describe: { optional: true }, nullable: true }); }
  stored   (options = {}) { return this.derive({ [STORED]: { ...this[STORED], ...(isString(options) ? { key: options } : options) } }); }

  // $(schema): its signal, a kept one after stored() with a key
  [SIGNAL] () { return this[STORED]?.key ? stored({}, this) : new Signal(this); }

  // what was kept, read back as far as it fits (stored()): a record field by field, what no longer fits
  // at its initial value; items that are a data type of their own (a $Record) come back as one
  fit (value) {
    if (this.kind === 'record' && isObject(value)) {
      return { value: Object.fromEntries(Object.entries(this.parts).map(([key, part]) => {
        const result = key in value ? part.validate(value[key]) : null;
        return [key, result && !result.issues ? result.value : part.initial];
      })) };
    }
    const result = this.validate(value);
    const item   = this.kind === 'list' ? this.parts?.item : null;
    return result.issues || !item?.factory ? result : { value: result.value.map(entry => item.create(entry)) };
  }

  // { value } or { issues: [{ message, path }] }
  validate (input, path = []) {
    if (input == null && this.nullable) return { value: input };
    const result = this.run(input, path);
    if (result.issues) return result;
    const issues = this.checks.filter(([fn]) => !fn(result.value)).map(([, message]) => ({ message, path }));
    return issues.length ? { issues } : result;
  }

  // a value of the data type this schema was made by: $Dict(Key, Value).create({ … }) is a $Dict with it
  create (value) {
    if (!this.factory) throw new TypeError(`[rat] ${this.kind} is no data type, there is nothing to create: its values are plain js`);
    const made = this.factory(this, value);
    // without a key yet it waits for one: $x! = …create() hands over the name
    return this[STORED]?.key ? stored({}, made) : made;
  }

  // a value in this schema's form: KebabCase.from('togglePlay') -> 'toggle-play'
  from (value) {
    if (!this.transform) throw new TypeError(`[rat] ${this.kind} has no transform, nothing can be made into it`);
    return this.transform(value);
  }

  // this schema's check, then made into target and checked by it: Str.to(KebabCase)
  to (target) {
    return this.derive({
      checks : [],
      run    : (value, path) => {
        const result = this.validate(value, path);
        return result.issues ? result : target.validate(target.from(result.value), path);
      },
    });
  }

  parse (value) {
    const result = this.validate(value);
    if (result.issues) throw new TypeError(`[rat] ${result.issues.map(issue => (issue.path.length ? issue.path.join('.') + ': ' : '') + issue.message).join(', ')}`);
    return result.value;
  }

  get '~standard' () { return { 
    validate : value => this.validate(value), 
    vendor   : 'rat', 
    version  : 1 
  }}
}

// the parts of a structure, each through its schema: [[key, schema, value], …] -> { issues } or { values, changed }.
// changed: a part came out other than it went in, so the structure is made anew, else it stays the same object
function partsIn (entries, path) {
  const issues = [];
  const values = [];
  let changed  = false;
  for (const [key, schema, value] of entries) {
    const result = schema.validate(value, [...path, key]);
    if (result.issues) { issues.push(...result.issues); continue; }
    if (result.value !== value) changed = true;
    values.push(result.value);
  }
  return issues.length ? { issues } : { changed, values };
}

// :::::: SCALARS: Bool, Num, Str

// the run of a scalar schema: coerce, then a type test
const scalar = (kind, test, coerce = value => value) => (input, path) => {
  const value = coerce(input);
  return test(value) ? { value } : issue(`expected ${kind}`, path);
};

class Scalar {
  #value;

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

// :::::: DATA TYPES

function dataType (Class, toSchema, { create = byConstructor, kind, name }) {
  function Type (...args) {
    if (new.target) return Reflect.construct(Class, args, new.target);
    const schema = isSchema(args[0]) && args[0].kind === kind ? args[0] : toSchema(...args);
    return schema.derive({ factory: (schema, value) => create(Type, schema, value) });
  }
  Object.defineProperty(Class, 'name', { value: name });
  Object.defineProperty(Type,  'name', { value: name });
  Object.setPrototypeOf(Type, Class);
  Type.prototype = Class.prototype;
  return Type;
}

function dataTypes (Class, toSchema, options) {
  const Type  = dataType(Class, toSchema, options);
  const $Type = dataType(reactive(Class), toSchema, { ...options, name: `$${options.name}` });
  register(Type, $Type);
  return [Type, $Type];
}

// :::::: EXPORT

export {
  GET, SET, STORED,
  Scalar, Schema,
  bare, byParse, dataType, dataTypes, issue, partsIn, scalar,
  schemaOf,
};


