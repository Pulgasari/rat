// @rat/types :: Str, $Str, the cases of writing

/*
Str is a schema: the value is a plain string. the cases (CamelCase, KebabCase …) are schemas of Str that
only pass a string already written that way; from() writes any string so. $Str is the reactive variant,
an object with value and methods: a write is checked by the schema, reads subscribe, writes notify.

  const Name = Str.min(1).max(80);
  KebabCase.from('togglePlay');    // 'toggle-play'

  const $query = new $Str('');
  $query.clear();
*/

import { reactive } from '@rat/signals';

import { GET, SET, Scalar, Schema, isString, scalar } from './schema.js';

// ::: SCHEMA

class StrSchema extends Schema {
  min     (length) { return this.check(value => value.length >= length, `at least ${length} characters`, { min: length }); }
  max     (length) { return this.check(value => value.length <= length, `at most ${length} characters`,  { max: length }); }
  pattern (regex, message = `matching ${regex}`) { return this.check(value => regex.test(value), message, { pattern: regex.source }); }
  
  get email () { return this.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'an email address'); }
  get uuid  () { return this.pattern(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i, 'a uuid'); }

  // a case of writing: only a string already in this case passes, from() makes one of any string
  case ({ regex = null, transform }) {
    return this.derive({
      describe: { regex: regex?.source ?? null },
      transform,
      run: (value, path) => {
        const result = this.run(value, path);
        if (result.issues) return result;
        if (transform(result.value) === result.value) return result;
        return { issues: [{ message: `expected ${regex ?? 'this case'}`, path }] };
      },
    });
  }
}

const Str = new StrSchema({ initial: '', kind: 'str', run: scalar('a string', isString) });

// ::: CASES

// 'togglePlay', 'toggle-play', 'Toggle Play', 'XMLHttp' -> ['toggle', 'play'], ['xml', 'http']
const toWords = value => String(value ?? '')
  .replace(/([a-z\d])([A-Z])/g, '$1 $2')
  .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
  .replace(/[\s\-_.]+/g, ' ')
  .trim()
  .toLowerCase()
  .split(' ')
  .filter(Boolean);

const upperFirst = word => word.charAt(0).toUpperCase() + word.slice(1);

const CamelCase = Str.case({
  regex     : /^[a-z][a-z0-9]*([A-Z][a-z0-9]*)*$/,
  transform : value => toWords(value).map((word, index) => index ? upperFirst(word) : word).join(''),
});

const ConstantCase = Str.case({
  regex     : /^[A-Z0-9]+(_[A-Z0-9]+)*$/,
  transform : value => toWords(value).join('_').toUpperCase(),
});

const KebabCase = Str.case({
  regex     : /^[a-z0-9]+(-[a-z0-9]+)*$/,
  transform : value => toWords(value).join('-'),
});

const LowerCase = Str.case({
  transform : value => String(value ?? '').toLowerCase(),
});

const MockingCase = Str.case({
  transform : value => [...String(value ?? '')].map((char, index) => index % 2 ? char.toUpperCase() : char.toLowerCase()).join(''),
});

const PascalCase = Str.case({
  regex     : /^[A-Z][a-z0-9]*([A-Z][a-z0-9]*)*$/,
  transform : value => toWords(value).map(upperFirst).join(''),
});

const SnakeCase = Str.case({
  regex     : /^[a-z0-9]+(_[a-z0-9]+)*$/,
  transform : value => toWords(value).join('_'),
});

const TitleCase = Str.case({
  regex     : /^[A-Z][a-z0-9]*(\s[A-Z][a-z0-9]*)*$/,
  transform : value => toWords(value).map(upperFirst).join(' '),
});

const UpperCase = Str.case({
  transform : value => String(value ?? '').toUpperCase(),
});

// ::: REACTIVE VARIANT

class StrType extends Scalar {
  constructor (value, schema) { super(value, schema, Str); }
  clear () { return this[SET](''); }
}

Object.defineProperty(StrType, 'name', { value: 'Str' });

const $Str = reactive(StrType, { reads: Scalar.reads, writes: { clear: str => str[GET]() !== '', value: Scalar.changes } });

// :::::: EXPORT

export {
  $Str, Str, StrSchema,
  CamelCase, ConstantCase, KebabCase,
  LowerCase, MockingCase, PascalCase, 
  SnakeCase, TitleCase, UpperCase,
  toWords
};
