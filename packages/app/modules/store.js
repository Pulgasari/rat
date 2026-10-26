// @rat/app :: store
// RAT.app.store: keys and values (@rat/bunker createStore), localStorage unless driver says otherwise,
// named after the app

import { createStore } from '@rat/bunker';

import '../vendor/bunker.js';

import { driverOf, nameOf } from '../_shared.js';

const store = (options, { config }) => createStore({ ...options, driver: driverOf(options.driver ?? 'local'), name: nameOf(options, config) });

// :::::: EXPORT

export default store;
