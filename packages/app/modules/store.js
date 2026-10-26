// @rat/app :: store
// RAT.app.store: keys and values (@rat/bunker createStore), named after the app. localStorage in the
// browser, preferences on android and ios, sqlite on the desktop, unless driver says otherwise

import { createStore } from '@rat/bunker';

import '../vendor/bunker.js';

import { nameOf } from '../_shared.js';
import { bunkerDriverOf } from '../drivers.js';

const store = async (options, { config }) => createStore({ ...options, driver: await bunkerDriverOf('store', options.driver), name: nameOf(options, config) });

// :::::: EXPORT

export default store;
