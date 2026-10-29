// @rat/types :: schema

/*
schemas are values (concept 5, d-14 a). a schema checks and coerces a value,
knows its initial value and describes itself, and speaks the standard schema
interface ('~standard'), so anything that takes zod or valibot takes these,
and @rat/runtime's signal() takes a schema as its initial value:

  let $view = Enum('grid', 'list');      // 'grid', and only 'grid' or 'list' from then on
  let $zoom = Num.range(50, 200).default(100);

every method returns a new schema, a schema never changes. Bool, Num, Str, Fn and Union are
schemas only, the values they describe are plain js (Bool, Num and Str have a reactive variant,
$Bool …, on Scalar below). Color, Enum, List, Record and Tuple are data types as well: called
they give a schema, with new a value. one file each, this one holds what they all build on.
*/

// :::::: IMPORT

import { Signal, SIGNAL } from '@rat/signals';
import { stored } from './stored.js';

// :::::: CONSTANTS | REFERENCES | SYMBOLS

const MADE   = new WeakMap;          // a value create() made -> the schema it was made by
const STORED = Symbol('rat.stored'); // the options of .stored()

// :::::: SCHEMA

class Schema {
  // run (value, path) -> { value } or { issues }: the kind check plus coercion, before the checks.
  // parts: the schemas a structure is made of (record fields, tuple items, union cases).
  // transform: how a value is made into this schema's form, for from() (a case of Str).
  // factory: (schema, value) -> a value of the data type, for create() (typed sets it). not make: Id.make() makes a key
  // [STORED]: the options of stored(), the schema makes kept values then
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

  derive (patch) { return new this.constructor({ ...this, ...patch, describe: { ...this.describe, ...patch.describe } }); }

  // a further condition: check(value => value % 2 === 0, 'even')
  check (fn, message = 'check failed', describe = {}) { return this.derive({ checks: [...this.checks, [fn, message]], describe }); }

  default  (value) { return this.derive({ describe: { initial: value }, initial: value }); }
  optional ()      { return this.derive({ describe: { optional: true }, nullable: true }); }

  // kept beyond the page (stored.js): a key or { key, in, debounce, sync, version, migrate }
  stored (options = {}) { return this.derive({ [STORED]: { ...this[STORED], ...(typeof options === 'string' ? { key: options } : options) } }); }

  // $(schema): its signal, a kept one after stored()
  [SIGNAL] () { return this[STORED] ? stored({}, this) : new Signal(this); }

  // { value } or { issues: [{ message, path }] }
  validate (input, path = []) {
    if (input == null && this.nullable) return { value: input };
    const result = this.run(input, path);
    if (result.issues) return result;
    const issues = this.checks.filter(([fn]) => !fn(result.value)).map(([, message]) => ({ message, path }));
    return issues.length ? { issues } : result;
  }

  is (value) { return !this.validate(value).issues; }

  // a value of the data type this schema was made by: $Dict(Key, Value).create({ … }) is a $Dict with it
  create (value) {
    if (!this.factory) throw new TypeError(`[rat] ${this.kind} is no data type, there is nothing to create: its values are plain js`);
    const made = this.factory(this, value);
    if (made !== null && typeof made === 'object') MADE.set(made, this);
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

const
isFn      = (value) => typeof value === 'function',
isObject  = (value) => value !== null && typeof value === 'object' && !Array.isArray(value),   // a structure's input: a class instance counts (a Record does)
isSchema  = (value) => value instanceof Schema,
isString  = (value) => typeof value === 'string',
madeBy    = (value) => MADE.get(value);

// :::::: SCALARS: Bool, Num, Str

// the run of a scalar schema: coerce, then a type test
const scalar = (kind, test, coerce = value => value) => (input, path) => {
  const value = coerce(input);
  return test(value) ? { value } : { issues: [{ message: `expected ${kind}`, path }] };
};

// a scalar as an object with value, the base of $Bool, $Num, $Str: a write is checked by the schema.
// (value), (value, schema) or (schema): at the schema's initial value
const GET = Symbol('rat.scalar.get');
const SET = Symbol('rat.scalar.set');

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

  // what reactive() needs of every scalar: its reads, and a write of value that changes something
  static reads   = ['value', 'toJSON', 'toString', 'valueOf'];
  static changes = (scalar, value) => !Object.is(scalar[GET](), value);
}

// :::::: DATA TYPES

// one name for a data type and its schema: `new List(items)` is a list, `List(Str)` the schema
// of a list of strings. the class stays a class (new, extends, instanceof), only a call differs.
// the schema of a call knows the type it was made by: create() makes one, $List(Str) a $List.
// make: (Type, schema, value) -> the value, when the constructor is not (schema, value)
const byConstructor = (Type, schema, value) => new Type(schema, value);

function typed (Class, toSchema, make = byConstructor) {
  const Type = new Proxy (Class, { apply: (target, self, args) => toSchema(...args).derive({ factory: (schema, value) => make(Type, schema, value) }) });
  return Type;
}

// a type whose schema takes nothing stands for it where a schema is asked: { path: Path } is { path: Path() }.
// bare() marks such a type (Color, Path …), schemaOf() calls it, a structure asks it for each of its parts
const BARE = Symbol('rat.bare');

const bare     = (Type)  => Object.defineProperty(Type, BARE, { value: true });
const schemaOf = (value) => isFn(value) && value[BARE] ? value() : value;

// :::::: EXPORT

export {
  GET, SET, STORED,
  Scalar, Schema,
  bare, scalar, typed,
  isObject, isSchema, isString,
  madeBy, schemaOf,
};


