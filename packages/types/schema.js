// @rat/types :: schema

/*
schemas are values (concept 5, d-14 a). a schema checks and coerces a value,
knows its initial value and describes itself, and speaks the standard schema
interface ('~standard'), so anything that takes zod or valibot takes these,
and @rat/runtime's signal() takes a schema as its initial value:

  let $view = Enum('grid', 'list');      // 'grid', and only 'grid' or 'list' from then on
  let $zoom = Num.range(50, 200).default(100);

every method returns a new schema, a schema never changes. Bool, Num, Str and
Record are schemas only, the values they describe are plain js. List and Enum
are data types as well (list.js, enum.js): called they give a schema, with new
a value.
*/

class Schema {
  // run (value, path) -> { value } or { issues }: the kind check plus coercion, before the checks
  constructor ({ checks = [], describe = {}, initial, kind, nullable = false, run }) {
    Object.assign(this, { checks, describe: { kind, ...describe }, initial, kind, nullable, run });
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

  parse (value) {
    const result = this.validate(value);
    if (result.issues) throw new TypeError(`[rat] ${result.issues.map(issue => (issue.path.length ? issue.path.join('.') + ': ' : '') + issue.message).join(', ')}`);
    return result.value;
  }

  get '~standard' () { return { validate: value => this.validate(value), vendor: 'rat', version: 1 }; }
}

// a scalar: coerce, then a type test
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

class StrSchema extends Schema {
  min     (length) { return this.check(value => value.length >= length, `at least ${length} characters`, { min: length }); }
  max     (length) { return this.check(value => value.length <= length, `at most ${length} characters`,  { max: length }); }
  pattern (regex, message = `matching ${regex}`) { return this.check(value => regex.test(value), message, { pattern: regex.source }); }
  get email () { return this.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'an email address'); }
  get uuid  () { return this.pattern(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i, 'a uuid'); }
}

const BOOLEAN_WORDS = { false: false, no: false, off: false, on: true, true: true, yes: true };

const toBool = value => typeof value === 'string' && value.toLowerCase() in BOOLEAN_WORDS ? BOOLEAN_WORDS[value.toLowerCase()] : value;
const toNum  = value => typeof value === 'string' && value.trim() !== '' && !isNaN(value) ? Number(value) : value;

const Bool = new Schema   ({ initial: false, kind: 'bool', run: scalar('a boolean', value => typeof value === 'boolean', toBool) });
const Num  = new NumSchema({ initial: 0,     kind: 'num',  run: scalar('a number',  value => typeof value === 'number' && Number.isFinite(value), toNum) });
const Str  = new StrSchema({ initial: '',    kind: 'str',  run: scalar('a string',  value => typeof value === 'string') });

// ::: structures

// an object with known fields; unknown fields are kept as they are
function Record (shape) {
  const keys = Object.keys(shape);
  return new Schema({
    describe : { fields: Object.fromEntries(keys.map(key => [key, shape[key].describe])) },
    initial  : Object.fromEntries(keys.map(key => [key, shape[key].initial])),
    kind     : 'record',
    run      : (value, path) => {
      if (value === null || typeof value !== 'object' || Array.isArray(value)) return { issues: [{ message: 'expected a record', path }] };
      const issues  = [];
      const changed = {};
      for (const key of keys) {
        const result = shape[key].validate(value[key], [...path, key]);
        if (result.issues) issues.push(...result.issues);
        else if (result.value !== value[key]) changed[key] = result.value;
      }
      if (issues.length) return { issues };
      return { value: Object.keys(changed).length ? { ...value, ...changed } : value };
    },
  });
}

const isSchema = value => value instanceof Schema;

// one name for a data type and its schema: `new List(items)` is a list, `List(Str)` the schema
// of a list of strings. the class stays a class (new, extends, instanceof), only a call differs
const typed = (Class, toSchema) => new Proxy(Class, { apply: (target, self, args) => toSchema(...args) });

// :::::: EXPORT

export { Bool, Num, Record, Schema, Str, isSchema, typed };
