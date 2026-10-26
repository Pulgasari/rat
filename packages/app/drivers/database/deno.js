// @rat/app :: drivers :: database, deno desktop: sqlite in the app's data folder. the deno side is host/deno.js

import { sqlite } from '../_sqlite.js';

export default sqlite({
  query : (name, sql, values) => globalThis.bindings['rat:sqlite.query'](name, sql, values),
  run   : (name, sql, values) => globalThis.bindings['rat:sqlite.run'](name, sql, values),
});
