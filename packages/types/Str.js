// @rat/types :: Str

import { Schema, scalar } from './schema.js';

// ::: the schema

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

const Str = new StrSchema({ initial: '', kind: 'str', run: scalar('a string', value => typeof value === 'string') });

// ::: the cases

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

// :::::: EXPORT

export {
  Str, StrSchema, 
  CamelCase, ConstantCase, KebabCase,
  LowerCase, MockingCase, PascalCase, 
  SnakeCase, TitleCase, UpperCase,
  toWords
};
