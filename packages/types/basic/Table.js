// @rat/types :: Table, $Table

// :::::: IMPORT

import { List } from './List.js';
import { Record } from './Record.js';
import { STORED, Schema, issue, partsIn, typed, variant } from './../schema.js';
import { isArray } from './../_shared.js';

// ::: SCHEMA

// fields or a Record schema -> the schema of a row
const rowOf = (shape) => shape instanceof Schema ? shape : Record(shape);

// an array or a Table, every row checked against the row schema: the rows out, a missing field at its initial value
function tableOf (shape) {
  const row = rowOf(shape);
  if (row.kind !== 'record') throw new TypeError('[rat] a Table needs fields or a Record schema');
  return new Schema({
    describe : { row: row.describe },
    initial  : [],
    kind     : 'table',
    parts    : { row },
    [STORED] : { in: 'database' },   // many rows: kept in the app's database, unless said otherwise
    run      : (value, path) => {
      if (value instanceof TableType) return { value };
      if (!isArray(value)) return issue('expected a table', path);
      const result = partsIn(value.map((entry, index) => [index, row, { ...row.initial, ...entry }]), path);
      return result.issues ? result : { value: result.values };
    },
  });
}

// ::: DATA TYPE

// the table schema of what new Table() got: another table's, a table schema, or one made of a record schema
function tableSchemaOf (source) {
  if (source instanceof TableType)  return source.schema;
  if (!(source instanceof Schema))  return null;
  return source.kind === 'table' ? source : tableOf(source);
}

// a row as the schema makes it, frozen, only its columns: a field the schema does not know is dropped
const rowParser = (row) => (entry) => {
  const parsed = row.parse({ ...row.initial, ...entry });
  return Object.freeze(Object.fromEntries(Object.keys(row.parts).map(key => [key, parsed[key]])));
};

class TableType extends List {
  // new Table(schema, rows?), new Table(other): a copy
  constructor (source, rows = []) {
    const schema = tableSchemaOf(source);
    if (!schema) throw new TypeError('[rat] a Table needs a Table schema or a Record schema');

    const parse = rowParser(schema.parts.row);
    super((source instanceof TableType ? source.toArray() : rows).map(parse));

    Object.defineProperty(this, 'schema', { value: schema });
    Object.defineProperty(this, 'parse',  { value: parse });
  }

  get columns () { return Object.keys(this.schema.parts.row.parts); }

  column (key) { return this.map(row => row[key]); }

  push    (...rows)               { return super.push    (...rows.map(this.parse)); }
  unshift (...rows)               { return super.unshift (...rows.map(this.parse)); }
  set     (index, row)            { return super.set(index, this.parse(row)); }
  replace (rows)                  { return super.replace([...rows].map(this.parse)); }
  update  (index, patch)          { return super.set(index, this.parse({ ...this.at(index), ...patch })); }
  splice  (start, count, ...rows) { return arguments.length < 2 ? super.splice(start) : super.splice(start, count, ...rows.map(this.parse)); }

  toJSON () { return this.toArray(); }
}

// ::: Table + $Table

const Table = typed(TableType, tableOf, { kind: 'table', name: 'Table' });

// one version for the whole table
const $Table = variant(Table);

// :::::: EXPORT

export { Table, $Table };
