// @rat/bunker :: memo

/*
memo() stores nothing of its own: it wraps a store and decides when what it
holds is still good.

  const api = memo(createStore({ driver: 'cache', name: 'icons' }), { ttl: DAY });

  await api.get('collections', () => fetchCollections());

  ttl      how long a value counts as fresh, in ms (default: for ever)
  stale    true: an old value comes back at once and is loaded anew behind it

a value that is loaded already is not loaded twice at the same time. the store
holds { at, value }.
*/

function memo (store, { stale = false, ttl = Infinity } = {}) {
  const loading = new Map;

  function load (key, loader) {
    if (!loading.has(key)) {
      const promise = Promise.resolve()
        .then(loader)
        .then(async value => { await store.set(key, { at: Date.now(), value }); return value; })
        .finally(() => loading.delete(key));
      loading.set(key, promise);
    }
    return loading.get(key);
  }

  return {
    store,

    // the value of key: fresh from the store, else loaded with loader (without one: undefined)
    async get (key, loader) {
      const hit   = await store.get(key);
      const fresh = hit !== undefined && Date.now() - hit.at < ttl;
      if (fresh) return hit.value;
      if (hit !== undefined && stale) {
        if (loader) load(key, loader).catch(() => {});
        return hit.value;
      }
      return loader ? load(key, loader) : undefined;
    },

    clear  : ()  => store.clear(),
    delete : key => store.delete(key),
  };
}

// :::::: EXPORT

export { memo };
