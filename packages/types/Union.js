// @rat/types :: Union

/*
Union is a schema only: one of several schemas, the first that fits wins.

  const Id    = Union(Num.int, Str.uuid);
  const Shade = Union({ hex: Str.pattern(/^#[0-9a-f]{6}$/i), named: Enum('red', 'blue') });

  Id.is(3);              // true
  Shade.which('red');    // 'named', the case that fits (an index for Union(a, b))

a union value is just a value of one of its cases, a string or a number, it
has nothing of its own. so there is no data type and no reactive variant:
`let $id = Id` is a signal that only takes what fits.
*/

import { Schema, isSchema } from './schema.js';

class UnionSchema extends Schema {
  // the name (or index) of the first case the value fits, null for none
  which (value) {
    for (const [name, schema] of this.parts) if (schema.is(value)) return name;
    return null;
  }
}

// Union(a, b, …) or Union({ name: a, … }), the first case's initial value is the initial one
function Union (...cases) {
  const named   = cases.length === 1 && !isSchema(cases[0]);
  const entries = named ? Object.entries(cases[0]) : cases.map((schema, index) => [index, schema]);
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
