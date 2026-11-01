// @rat/types :: Table, $Table

// :::::: IMPORT

import { LIST_READS, LIST_WRITES, List } from './List.js';
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

class TableType extends List {
  // new Table(schema, rows?), new Table(other): a copy
  constructor (source, rows = []) {
    const copy   = source instanceof TableType;
    const schema = copy ? source.schema : source instanceof Schema && source.kind === 'table' ? source : source instanceof Schema ? tableOf(source) : null;
    if (!schema) throw new TypeError('[rat] a Table needs a Table schema or a Record schema');

    const row   = schema.parts.row;
    const keys  = Object.keys(row.parts);
    // only the columns: a field the schema does not know is dropped
    const parse = entry => { const parsed = row.parse({ ...row.initial, ...entry }); return Object.freeze(Object.fromEntries(keys.map(key => [key, parsed[key]]))); };
    super((copy ? source.toArray() : rows).map(parse));

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
const $Table = variant(Table, {
  reads  : [...LIST_READS, 'column', 'columns'],
  writes : [...LIST_WRITES, 'update'],
});

// :::::: EXPORT

export { Table, $Table };
