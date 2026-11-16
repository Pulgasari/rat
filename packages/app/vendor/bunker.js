// @rat/app :: bunker

/*
what rat adds to the stores of @rat/bunker (database, store), so bunker itself
knows nothing of rat:

  store.as($Array)    a $Array that follows the store: every change reads the values anew
  store.$items        the same $Array, one per store

a snapshot is bunker's own: await store.as(Array).
*/

import { $Array } from '@rat/types';

import { Store, register } from '@rat/bunker';

register($Array, store => {
  const items   = new $Array;
  const refresh = async () => items.replace(await store.values());
  store.on('change', refresh);
  refresh();
  return items;
});

const items = new WeakMap;

Object.defineProperty(Store.prototype, '$items', {
  configurable : true,
  get () {
    if (!items.has(this)) items.set(this, this.as($Array));
    return items.get(this);
  },
});
