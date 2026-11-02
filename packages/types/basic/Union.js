// @rat/types :: Union

// :::::: IMPORT

import { Schema, issue, schemaOf } from './../schema.js';
import { isSchema } from './../_shared.js';

// ::: SCHEMA

class UnionSchema extends Schema {
  // the name (or index) of the first case the value fits, null for none
  which (value) {
    for (const [name, schema] of this.parts) if (schema.is(value)) return name;
    return null;
  }
}

// ::: CASES

// Union({ text: Str, count: Num }): the cases have names
const isNamed = (given) => given.length === 1 && !isSchema(schemaOf(given[0]));

// the cases as [name, schema]: Union(Str, Num) -> [[0, Str], [1, Num]], Union({ text: Str }) -> [['text', Str]]
function casesOf (given) {
  const pairs = isNamed(given) ? Object.entries(given[0]) : given.map((schema, index) => [index, schema]);
  return pairs.map(([name, schema]) => [name, schemaOf(schema)]);
}

// the first case the value fits, its result. null for none
function firstFit (cases, value, path) {
  for (const [, schema] of cases) {
    const result = schema.validate(value, path);
    if (!result.issues) return result;
  }
  return null;
}

// ::: Union

// Union(a, b, …) or Union({ name: a, … }), the first case's initial value is the initial one
function Union (...given) {
  const cases = casesOf(given);
  if (!cases.length) throw new TypeError('[rat] a Union needs at least one case');

  const named    = isNamed(given);
  const expected = cases.map(([name, schema]) => named ? name : schema.kind).join(', ');

  return new UnionSchema({
    describe : { cases: cases.map(([name, schema]) => ({ name, ...schema.describe })) },
    initial  : cases[0][1].initial,
    kind     : 'union',
    parts    : cases,
    run      : (value, path) => firstFit(cases, value, path) ?? issue(`none of ${expected}`, path),
  });
}

// :::::: EXPORT

export { Union };
