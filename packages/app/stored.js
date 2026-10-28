// @rat/app :: stored

/*
the places of kept values (stored, @rat/types) in an app, set up in configure(): after the mods, before
the app's modules run.

  store      RAT.app.store, read ahead: every key in memory, so a kept value is there before the first
             paint on every platform. the store mod's when config.rat.js names one, else one by default
  database   a store in the app's database (the table stored), read on first use: a Table goes there

config.rat.js: stored: { in: 'database' } is where everything goes that names no place of its own.

a kept value made in a component inside named views, parts or areas gets their names in its key, the
outermost first: let $tabs! in <rat-view name='podcasts'> is podcasts:tabs, in 'search' search:tabs.
one made in a module (state.rat.js) or the app's own component keeps its name as it is.
*/

// :::::: IMPORT

import { createStore } from '@rat/bunker';
import { building }    from '@rat/runtime';
import { stored }      from '@rat/types';

import { nameOf }         from './_shared.js';
import { bunkerDriverOf } from './drivers.js';
import { MODS }           from './mods.js';

// ::::::

const NAMED = 'rat-area[name], rat-part[name], rat-view[name]';

// the names around what is being built, the outermost first. an anchor in a fragment not in the page yet
// finds only what is in the fragment, the anchors before it the rest
function namesHere () {
  const found = [];
  for (const node of building()) {
    const chain = [];
    for (let element = (node.nodeType === 1 ? node : node.parentElement)?.closest(NAMED); element; element = element.parentElement?.closest(NAMED)) {
      if (!found.includes(element)) chain.unshift(element);
    }
    found.push(...chain);
  }
  return found.map(element => element.getAttribute('name'));
}

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
  stored.scope = namesHere;
}

// :::::: EXPORT

export { useStored };
