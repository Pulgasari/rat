// @rat/types :: Union

import { Schema, isSchema, schemaOf } from './schema.js';

class UnionSchema extends Schema {
  // the name (or index) of the first case the value fits, null for none
  which (value) {
    for (const [name, schema] of this.parts) if (schema.is(value)) return name;
    return null;
  }
}

// Union(a, b, …) or Union({ name: a, … }), the first case's initial value is the initial one
function Union (...given) {
  const cases   = given.map(schemaOf);
  const named   = cases.length === 1 && !isSchema(cases[0]);
  const entries = named ? Object.entries(cases[0]).map(([name, schema]) => [name, schemaOf(schema)]) : cases.map((schema, index) => [index, schema]);
  if (!entries.length) throw new TypeError('[rat] a Union needs at least one case');

  return new UnionSchema({
    describe : { cases: entries.map(([name, schema]) => ({ name, ...schema.describe })) },
    initial  : entries[0][1].initial,
    kind     : 'union',
    parts    : entries,
    run      : (value, path) => {
      for (const [, schema] of entries) {
        const result = schema.validate(value, path);
        if (!result.issues) return result;
      }
      return { issues: [{ message: `none of ${entries.map(([name, schema]) => named ? name : schema.kind).join(', ')}`, path }] };
    },
  });
}

// :::::: EXPORT

export { Union, UnionSchema };
