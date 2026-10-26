// @rat/app :: drivers :: database, capacitor (android, ios): @capacitor-community/sqlite

import { plugin } from '../_capacitor.js';
import { sqlite } from '../_sqlite.js';

const SQLite = () => plugin('CapacitorSQLite', '@capacitor-community/sqlite');

const opened = new Map;   // name -> promise of the open connection

function open (name) {
  if (!opened.has(name)) opened.set(name, (async () => {
    const api = await SQLite();
    const { result } = await api.isConnection({ database: name, readonly: false }).catch(() => ({ result: false }));
    if (!result) await api.createConnection({ database: name, encrypted: false, mode: 'no-encryption', readonly: false, version: 1 });
    await api.open({ database: name, readonly: false });
    return api;
  })());
  return opened.get(name);
}

// ios puts the column names into the first row
const rowsOf = ({ values = [] }) => values.filter(row => !('ios_columns' in row));

export default sqlite({
  query : async (name, statement, values) => rowsOf(await (await open(name)).query({ database: name, readonly: false, statement, values })),
  run   : async (name, statement, values) => { await (await open(name)).run({ database: name, readonly: false, statement, transaction: false, values }); },
});
