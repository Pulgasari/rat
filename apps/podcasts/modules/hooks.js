// podcasts :: modules/hooks.js
// reading the db from a view. indexeddb is async and preact renders synchronously,
// so a view holds its own slice and reloads it when the table changes — in this tab
// or another, since @bunker/db carries its change feed across a BroadcastChannel.
//
// this is what replaces a global mirror of podcasts and episodes: the db is the one
// copy, and a change notification is all a view needs to go and read it again.

// :::::: IMPORTS

import { useEffect, useState } from '/.shared/js/vendors.js';

// :::::: CACHE
// the last rows read under a key, so navigating back renders immediately and the
// reload happens behind the already-drawn list instead of a loading flash.

// the key is table + deps, so THE SAME table AND deps MUST MEAN THE SAME QUERY —
// two views reading `podcasts` with no deps, one as a map and one as a list, would
// hand each other the wrong shape out of here. name the query in the deps.
const cache = new Map();
const keyOf = (table, deps) => table + ':' + deps.join(',');

// :::::: MAIN

/**
 * a slice of one table, kept current. `null` until the first read lands, which is
 * how a view tells "still loading" from "nothing there".
 *
 * `deps` identify the query, not just its arguments: two different reads of one
 * table need different deps, or they share a cache entry and its shape.
 */
export function useTable (table, read, deps = []) {
  const key = keyOf(table, deps);
  const [rows, setRows] = useState(() => cache.get(key) ?? null);

  useEffect(() => {
    let alive = true;

    const load = () => read().then(value => {
      cache.set(key, value);
      if (alive) setRows(value);
    });

    load();
    const stop = zugriff.app.db.onChange(table, load);

    return () => { alive = false; stop(); };
  }, [key]);

  return rows;
}

export default useTable;
