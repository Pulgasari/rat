// @rat/types :: schema

/*
schemas are values (concept 5, d-14 a). a schema checks and coerces a value,
knows its initial value and describes itself, and speaks the standard schema
interface ('~standard'), so anything that takes zod or valibot takes these,
and @rat/runtime's signal() takes a schema as its initial value:

  let $view = Enum('grid', 'list');      // 'grid', and only 'grid' or 'list' from then on
  let $zoom = Num.range(50, 200).default(100);

every method returns a new schema, a schema never changes. Bool, Num, Str (Str.js),
Fn (Fn.js) and Union are schemas only, the values they describe are plain js. Color, Enum,
List, Record and Tuple are data types as well (one file each): called they
give a schema, with new a value.
*/

// :::::: IMPORT

import { Signal, SIGNAL } from '@rat/signals';
import { stored } from './stored.js';

// :::::: CONSTANTS | REFERNCES | SYMBOLS

const BOOLEAN_WORDS = { false: false, no: false, off: false, on: true, true: true, yes: true };
const MADE   = new WeakMap;          // a value create() made -> the schema it was made by
const STORED = Symbol('rat.stored'); // the options of .stored()

// ::::::

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

// a scalar: coerce, then a type test (Bool, Num, Str in Str.js)
const scalar = (kind, test, coerce = value => value) => (input, path) => {
  const value = coerce(input);
  return test(value) ? { value } : { issues: [{ message: `expected ${kind}`, path }] };
};

// ::: scalars

class NumSchema extends Schema {
  min   (min)      { return this.check(value => value >= min, `at least ${min}`, { min }); }
  max   (max)      { return this.check(value => value <= max, `at most ${max}`,  { max }); }
  range (min, max) { return this.min(min).max(max).derive({ initial: this.initial < min || this.initial > max ? min : this.initial }); }
  get int ()       { return this.check(Number.isInteger, 'an integer', { int: true }); }
}

const
toBool = (value) => isBoolWord (value) ? BOOLEAN_WORDS[value.toLowerCase()] : value,
toNum  = (value) => isNumeric  (value) ? Number(value) : value;

const 
Bool = new Schema    ({ initial: false, kind: 'bool', run: scalar('a boolean', isBool, toBool) }),
Num  = new NumSchema ({ initial: 0,     kind: 'num',  run: scalar('a number',  isNumb, toNum) });

const
isBool     = (value) => typeof value === 'boolean',
isBoolWord = (value) => isString(value) && value.toLowerCase() in BOOLEAN_WORDS,
isFn       = (value) => typeof value === 'function',
isNum      = (value) => typeof value === 'number' && Number.isFinite(value),
isNumeric  = (value) => isString(value) && value.trim() !== '' && !isNaN(value),
isObject   = (value) => value !== null && typeof value === 'object' && !Array.isArray(value),
isSchema   = (value) => value instanceof Schema,
isString   = (value) => typeof value === 'string',
madeBy     = (value) => MADE.get(value);

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
  STORED,
  Bool, Num, Schema, 
  bare, scalar, typed,
  isObject, isSchema,
  madeBy, schemaOf, 
};


