// @rat/types :: Table, $Table

/*
Table is a List whose rows all follow one record schema: the same keys, other
values. called, it is the schema:

  const Todos = Table({ title: Str, done: Bool });      // or Table(Record({ … }))

  const todos = new Table(Todos, [{ title: 'milk' }]);  // a row gets the initial value of a missing field
  todos.push({ title: 'eggs', done: true });            // checked and coerced like a Record
  todos.update(0, { done: true });                      // a row is frozen: a change goes through the table
  todos.column('title');                                // a List: milk, eggs
  todos.where({ done: false });                         // the rows a test of match.js lets through, a List

a row is a plain frozen object with exactly the columns, its position is its key. every List method
works, the ones that add or replace rows check them. $Table has one version
for the whole table: any write updates whatever read the table.
*/

import { LIST_READS, LIST_WRITES, List } from './List.js';
import { Record } from './Record.js';
import { Schema, issue, typed, variant } from './schema.js';

// ::: SCHEMA

// fields or a Record schema -> the schema of a row
const rowOf = (shape) => shape instanceof Schema ? shape : Record(shape);

// an array or a Table, every row checked against the row schema
function tableOf (shape) {
  const row = rowOf(shape);
  if (row.kind !== 'record') throw new TypeError('[rat] a Table needs fields or a Record schema');
  return new Schema({
    describe : { row: row.describe },
    initial  : [],
    kind     : 'table',
    parts    : { row },
    run      : (value, path) => {
      const table = value instanceof TableType;
      if (!table && !Array.isArray(value)) return issue('expected a table', path);
      const rows   = table ? value.toArray() : value;
      const issues = [];
      rows.forEach((entry, index) => { 
        const result = row.validate({ ...row.initial, ...entry }, [...path, index]); 
        if (result.issues) issues.push(...result.issues); 
      });
      return issues.length ? { issues } : { value };
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

  push    (...rows)        { return super.push    (...rows.map(this.parse)); }
  unshift (...rows)        { return super.unshift (...rows.map(this.parse)); }
  set     (index, row)     { return super.set(index, this.parse(row)); }
  replace (rows)           { return super.replace([...rows].map(this.parse)); }
  update  (index, patch)   { return super.set(index, this.parse({ ...this.at(index), ...patch })); }
  splice  (start, count, ...rows) { return arguments.length < 2 ? super.splice(start) : super.splice(start, count, ...rows.map(this.parse)); }

  toJSON () { return this.toArray(); }
}

// ::: Table + $Table

const Table = typed(TableType, tableOf, { kind: 'table', name: 'Table' });

// one version for the whole table
const $Table = variant(Table, {
  reads  : [...LIST_READS, 'column', 'columns'],
  writes : { ...LIST_WRITES, update: true },
});

// :::::: EXPORT

export { Table, $Table };
