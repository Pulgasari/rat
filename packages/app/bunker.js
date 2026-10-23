// @rat/app :: bunker

/*
what rat adds to the stores of @rat/bunker (database, store), so bunker itself
knows nothing of rat:

  await store.as(List)    a List of the values, a snapshot
  store.as($List)         a $List that follows the store: every change reads the values anew
  store.$items            the same $List, one per store
*/

import { $List, List } from '@rat/types';

import { Store, register } from '@rat/bunker';

register(List, async store => List.from(await store.values()));

register($List, store => {
  const list    = new $List([]);
  const refresh = async () => list.replace(await store.values());
  store.on('change', refresh);
  refresh();
  return list;
});

const items = new WeakMap;

Object.defineProperty(Store.prototype, '$items', {
  configurable : true,
  get () {
    if (!items.has(this)) items.set(this, this.as($List));
    return items.get(this);
  },
});
