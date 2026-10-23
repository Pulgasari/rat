// @rat/bunker :: cast

/*
store.as(Type): the store's content in the form Type stands for.

  await store.as(Array)      the values
  await store.as(Object)     { key: value }
  await store.as(Map)        a Map
  await store.as('keys')     the keys, 'values' and 'entries' as well

a form of your own: register(Type, store => …). a promise is a snapshot, a
form that follows the store (rat's $List, see bunker.js of @rat/app) subscribes to its changes
and returns at once.
*/

const forms = new Map;

const register = (Type, make) => { forms.set(Type, make); };

register(Array,     store => store.values());
register(Map,       async store => new Map(await store.entries()));
register(Object,    async store => Object.fromEntries(await store.entries()));
register('entries', store => store.entries());
register('keys',    store => store.keys());
register('values',  store => store.values());

function cast (Type, store) {
  const make = forms.get(Type);
  if (!make) throw new TypeError(`[bunker] as(): no form for ${Type?.name ?? String(Type)}, register one`);
  return make(store);
}

// :::::: EXPORT

export { cast, register };
