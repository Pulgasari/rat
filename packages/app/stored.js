// @rat/app :: stored

/*
the places of kept values (stored, @rat/types) in an app, set up in configure(): after the mods, before
the app's modules run.

  store      RAT.app.store, read ahead: every key in memory, so a kept value is there before the first
             paint on every platform. the store mod's when config.rat.js names one, else one by default
  database   a store in the app's database (the table stored), read on first use: a Table goes there

config.rat.js: stored: { in: 'database' } is where everything goes that names no place of its own.
*/

// :::::: IMPORT

import { createStore } from '@rat/bunker';
import { stored }      from '@rat/types';

import { nameOf }         from './_shared.js';
import { bunkerDriverOf } from './drivers.js';
import { MODS }           from './mods.js';

// ::::::

async function useStored (app, config) {
  if (!app.store) {
    const { default: make } = await MODS.store();
    Object.defineProperty(app, 'store', { configurable: true, enumerable: true, value: await make({}, { app, config }) });
  }
  await app.store.load();
  stored.place('store', app.store);

  stored.place('database', createStore({
    driver : await bunkerDriverOf('database'),
    name   : nameOf({}, config),
    table  : 'stored',
  }));

  if (config.stored?.in) stored.defaults.in = config.stored.in;
}

// :::::: EXPORT

export { useStored };
