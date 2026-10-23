// @rat/app :: database
// RAT.app.database: tables of records (@rat/bunker createDatabase), indexeddb unless driver says
// otherwise, named after the app. a table reads as table.$items in markup (bunker.js)

import { createDatabase } from '@rat/bunker';

import './bunker.js';

import { driverOf, nameOf } from './_shared.js';

const database = (options, { config }) => createDatabase({ ...options, driver: driverOf(options.driver ?? 'indexeddb'), name: nameOf(options, config) });

// :::::: EXPORT

export default database;
