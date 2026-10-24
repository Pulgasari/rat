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

class Schema {
  // run (value, path) -> { value } or { issues }: the kind check plus coercion, before the checks.
  // parts: the schemas a structure is made of (record fields, tuple items, union cases).
  // transform: how a value is made into this schema's form, for from() (a case of Str)
  constructor ({ checks = [], describe = {}, initial, kind, nullable = false, parts = null, run, transform = null }) {
    Object.assign(this, { checks, describe: { kind, ...describe }, initial, kind, nullable, parts, run, transform });
    Object.freeze(this);
  }

  derive (patch) { return new this.constructor({ ...this, ...patch, describe: { ...this.describe, ...patch.describe } }); }

  // a further condition: check(value => value % 2 === 0, 'even')
  check (fn, message = 'check failed', describe = {}) { return this.derive({ checks: [...this.checks, [fn, message]], describe }); }

  default  (value) { return this.derive({ describe: { initial: value }, initial: value }); }
  optional ()      { return this.derive({ describe: { optional: true }, nullable: true }); }

  // { value } or { issues: [{ message, path }] }
  validate (input, path = []) {
    if (input == null && this.nullable) return { value: input };
    const result = this.run(input, path);
    if (result.issues) return result;
    const issues = this.checks.filter(([fn]) => !fn(result.value)).map(([, message]) => ({ message, path }));
    return issues.length ? { issues } : result;
  }

  is (value) { return !this.validate(value).issues; }

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

  get '~standard' () { return { validate: value => this.validate(value), vendor: 'rat', version: 1 }; }
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

const BOOLEAN_WORDS = { false: false, no: false, off: false, on: true, true: true, yes: true };

const toBool = value => typeof value === 'string' && value.toLowerCase() in BOOLEAN_WORDS ? BOOLEAN_WORDS[value.toLowerCase()] : value;
const toNum  = value => typeof value === 'string' && value.trim() !== '' && !isNaN(value) ? Number(value) : value;

const Bool = new Schema   ({ initial: false, kind: 'bool', run: scalar('a boolean', value => typeof value === 'boolean', toBool) });
const Num  = new NumSchema({ initial: 0,     kind: 'num',  run: scalar('a number',  value => typeof value === 'number' && Number.isFinite(value), toNum) });

const isSchema = value => value instanceof Schema;

// one name for a data type and its schema: `new List(items)` is a list, `List(Str)` the schema
// of a list of strings. the class stays a class (new, extends, instanceof), only a call differs
const typed = (Class, toSchema) => new Proxy(Class, { apply: (target, self, args) => toSchema(...args) });

// a structure's input: a plain object, not an array, a class instance counts (a Record does)
const isObject = value => value !== null && typeof value === 'object' && !Array.isArray(value);

// :::::: EXPORT

export { Bool, Num, Schema, isObject, isSchema, scalar, typed };
