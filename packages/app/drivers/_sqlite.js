// @rat/app :: drivers :: sqlite

/*
a @rat/bunker driver over sqlite: a table of keys and values per store, all tables of a name in one
database. a shell gives the two calls:

  query (name, sql, values) -> rows
  run   (name, sql, values)

keys and values are json (holds: 'string'), a key keeps its type.
*/

const sqlite = backend => ({ name = 'bunker', table = 'store' } = {}) => {
  const quoted = `"${String(table).replace(/"/g, '""')}"`;
  const keyOf  = key => JSON.stringify(key);

  let made;
  const ready = () => made ??= backend.run(name, `CREATE TABLE IF NOT EXISTS ${quoted} (key TEXT PRIMARY KEY, value TEXT NOT NULL)`, []);
  const query = async (sql, values = []) => { await ready(); return backend.query(name, sql, values); };
  const run   = async (sql, values = []) => { await ready(); await backend.run(name, sql, values); };

  return {
    holds  : 'string',
    sync   : false,
    clear  : ()           => run(`DELETE FROM ${quoted}`),
    delete : key          => run(`DELETE FROM ${quoted} WHERE key = ?`, [keyOf(key)]),
    get    : async key    => (await query(`SELECT value FROM ${quoted} WHERE key = ?`, [keyOf(key)]))[0]?.value,
    keys   : async ()     => (await query(`SELECT key FROM ${quoted}`)).map(row => JSON.parse(row.key)),
    set    : (key, value) => run(`INSERT INTO ${quoted} (key, value) VALUES (?, ?) ON CONFLICT (key) DO UPDATE SET value = excluded.value`, [keyOf(key), value]),
    values : async ()     => (await query(`SELECT value FROM ${quoted}`)).map(row => row.value),
  };
};

export { sqlite };
