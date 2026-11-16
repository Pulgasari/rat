// @rat/types :: Table, $Table

/*
an array whose rows all follow one record schema: the same keys, other values. a row is a plain
frozen object with exactly the columns, a field the schema does not know is dropped, a missing one
stands at its initial value.

  Table(fields)                  the schema: Table({ id: Str, name: Str }), or Table(aRecordSchema)
  $Table(fields).create(rows)    a reactive array of such rows, every row that comes in is checked
  new $Table(schema, rows)       the same

besides what every array has: columns, column(key), update(index, patch).
*/

// :::::: IMPORT

import { REACTIVE } from '@rat/signals';

import { Record }                          from './Record.js';
import { STORED, Schema, issue, partsIn }  from './../schema.js';
import { isArray, isSchema, isSchemaOf }   from './../_shared.js';
import { reactiveArray }                   from './builtins.js';

// :::::: HELPERS

const isTableSchema = isSchemaOf('table');
const isTable       = value => isArray(value) && isTableSchema(value.schema);

// fields or a Record schema -> the schema of a row
const rowOf = shape => isSchema(shape) ? shape : Record(shape);

// a row as it is kept: checked, only the columns, frozen
function parserOf (row) {
  const keys = Object.keys(row.parts);
  return entry => {
    const parsed = row.parse({ ...row.initial, ...entry });
    const picked = {};
    for (const key of keys) if (key in parsed) picked[key] = parsed[key];
    return Object.freeze(picked);
  };
}

// :::::: SCHEMA

// an array or a $Table, every row checked against the row schema: the rows out, a missing field at its initial value
function tableOf (shape) {
  if (isTableSchema(shape)) return shape;
  const row = rowOf(shape);
  if (row.kind !== 'record') throw new TypeError('[rat] a Table needs fields or a Record schema');
  return new Schema({
    describe : { row: row.describe },
    initial  : [],
    kind     : 'table',
    parts    : { row },
    [STORED] : { in: 'database' },   // many rows: kept in the app's database, unless said otherwise
    run      : (value, path) => {
      if  (isTable(value)) return { value };
      if (!isArray(value)) return issue('expected a table', path);
      const result = partsIn(value.map((entry, index) => [index, row, { ...row.initial, ...entry }]), path);
      return result.issues ? result : { value: result.values };
    },
  });
}

// :::::: Table + $Table

const MEMBERS = {
  get columns () { return Object.keys(this.schema.parts.row.parts); },

  column (key)          { return this.map(row => row[key]); },
  update (index, patch) { this[index] = { ...this.at(index), ...patch }; return this; },
};

// the schema only: a table that is no $Table is a plain array of rows
const Table = shape => tableOf(shape);

// new $Table(schema | fields, rows): the table. $Table(fields): the schema whose create() makes one
function $Table (shape, rows) {
  const schema = tableOf(shape);
  if (!new.target) return schema.derive({ factory: (schema, rows) => new $Table(schema, rows) });
  return reactiveArray(rows ?? [], { coerce: parserOf(schema.parts.row), members: MEMBERS, schema });
}

Object.defineProperty($Table, Symbol.hasInstance, { value: value => isTable(value) && value[REACTIVE] === true });

// :::::: EXPORT

export { Table, $Table };
