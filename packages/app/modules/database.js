// @rat/app :: database

/*
RAT.app.database: tables of records (@rat/bunker createDatabase), named after the app.
indexeddb in the browser, sqlite on android, ios and the desktop, unless driver says
otherwise. a table reads as table.$items in markup (bunker.js)
*/

// :::::: IMPORT

import { createDatabase } from '@rat/bunker';
import '../vendor/bunker.js';
import { nameOf } from '../_shared.js';
import { bunkerDriverOf } from '../drivers.js';

// ::::::

const database = async (options, { config }) => createDatabase({
  ...options,
  driver : await bunkerDriverOf('database', options.driver),
  name   : nameOf(options, config),
});

// :::::: EXPORT

export default database;
