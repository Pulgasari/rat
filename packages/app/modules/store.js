// @rat/app :: store

/*
RAT.app.store | @rat/bunker createStore
keys and values named after the app.
- localStorage in the browser,
- preferences on android and ios, 
- sqlite on the desktop,
- unless driver says otherwise
*/

// :::::: IMPORT

import { createStore } from '@rat/bunker';
import '../vendor/bunker.js';   // $items and as(List) on the store (a side effect: package.json sideEffects)
import { bunkerDriverOf } from '../drivers.js';

// ::::::

const store = async (options, { config }) => createStore ({
  ...options,
  driver : await bunkerDriverOf ('store', options.driver),
  name   : options.name ?? config.id ?? config.name ?? 'rat',
});

/*
const store = async (options) => createStore ({
  ...options,
  driver : await bunkerDriverOf ('store', options.driver),
  key    : options.key ?? RAT.config.id ?? 'rat',
});
*/

// :::::: EXPORT

export default store;
