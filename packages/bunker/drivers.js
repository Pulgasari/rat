// @rat/bunker :: drivers

/*
a driver is where values live, the same small contract for every kind:

  { holds, sync, get (key), set (key, value), delete (key), keys (), clear (), watch? (fn) }

  holds   'string' | 'clone' | 'response': what it can keep, decides the codec
  sync    true: get, set, delete, keys and clear answer at once (the store offers
          getSync … then), false: they return promises
  watch   changes from outside (another tab), fn({ type, keys }), returns its stop

  memory         a Map, gone with the page                                   sync
  local          localStorage, every key under `name:`                      sync
  session        sessionStorage, the same                                   sync
  cookie         document.cookie, every key under `name:`                   sync
  indexeddb      an object store `table` in the database `name`
  cache          the Cache API cache `name`, keys are urls

a driver of your own is an object of that shape, or a function of the options
that makes one (a store hands it name, a database name and table).
*/

// :::::: MEMORY

function memory () {
  const map = new Map;
  return {
    holds  : 'clone',
    sync   : true,
    clear  : ()           => map.clear(),
    delete : key          => { map.delete(key); },
    get    : key          => map.get(key),
    keys   : ()           => [...map.keys()],
    set    : (key, value) => { map.set(key, value); },
  };
}

// :::::: WEB STORAGE

function webStorage (area) {
  return ({ name = 'bunker' } = {}) => {
    const prefix = `${name}:`;
    const own    = () => Object.keys(globalThis[area]).filter(key => key.startsWith(prefix));

    return {
      holds  : 'string',
      sync   : true,
      clear  : ()           => { for (const key of own()) globalThis[area].removeItem(key); },
      delete : key          => { globalThis[area].removeItem(prefix + key); },
      get    : key          => globalThis[area].getItem(prefix + key) ?? undefined,
      keys   : ()           => own().map(key => key.slice(prefix.length)),
      set    : (key, value) => { globalThis[area].setItem(prefix + key, value); },

      // another tab wrote: the storage event, only for this area and these keys
      watch (fn) {
        const listener = event => {
          if (event.storageArea !== globalThis[area]) return;
          if (event.key === null) return fn({ keys: [], type: 'clear' });
          if (event.key.startsWith(prefix)) fn({ keys: [event.key.slice(prefix.length)], type: event.newValue === null ? 'delete' : 'set' });
        };
        addEventListener('storage', listener);
        return () => removeEventListener('storage', listener);
      },
    };
  };
}

const local   = webStorage('localStorage');
const session = webStorage('sessionStorage');

// :::::: COOKIE

function cookie ({ maxAge = 60 * 60 * 24 * 400, name = 'bunker', path = '/', sameSite = 'Lax' } = {}) {
  const prefix = encodeURIComponent(`${name}:`);
  const all    = () => Object.fromEntries(document.cookie.split('; ').filter(Boolean).map(pair => {
    const at = pair.indexOf('=');
    return [pair.slice(0, at), pair.slice(at + 1)];
  }));
  const write  = (key, value, age) => { document.cookie = `${prefix}${encodeURIComponent(key)}=${encodeURIComponent(value)}; path=${path}; max-age=${age}; samesite=${sameSite}`; };
  const keys   = () => Object.keys(all()).filter(key => key.startsWith(prefix)).map(key => decodeURIComponent(key.slice(prefix.length)));

  return {
    holds  : 'string',
    sync   : true,
    clear  : ()           => { for (const key of keys()) write(key, '', 0); },
    delete : key          => write(key, '', 0),
    get    : key          => { const value = all()[prefix + encodeURIComponent(key)]; return value === undefined ? undefined : decodeURIComponent(value); },
    keys,
    set    : (key, value) => write(key, value, maxAge),
  };
}

// :::::: INDEXEDDB

/*
one connection per database. a table that is not there yet is created with
the next version: the opens of one database run one after the other, so two
tables asked for at once do not race. another tab upgrading closes ours, the
next call opens it again.
*/

const requestOf = request => new Promise((resolve, reject) => {
  request.onsuccess = () => resolve(request.result);
  request.onerror   = () => reject(request.error);
});

const connections = new Map;   // name -> Promise<IDBDatabase>
const queues      = new Map;   // name -> the last open, so they run in turn

function connect (name, table) {
  const previous = connections.get(name);   // read before this step takes its place
  const step = (queues.get(name) ?? Promise.resolve()).then(async () => {
    let db = await previous?.catch(() => null);
    if (!db) db = await requestOf(indexedDB.open(name));
    if (!db.objectStoreNames.contains(table)) {
      const version = db.version + 1;
      db.close();
      const request = indexedDB.open(name, version);
      request.onupgradeneeded = () => request.result.createObjectStore(table);
      db = await requestOf(request);
    }
    db.onversionchange = () => { db.close(); connections.delete(name); };
    return db;
  });
  connections.set(name, step);
  queues.set(name, step.catch(() => null));
  return step;
}

function indexeddb ({ name = 'bunker', table = 'store' } = {}) {
  // one transaction, its result once it is complete
  async function run (mode, fn) {
    let db = await (connections.get(name) ?? connect(name, table));
    if (!db.objectStoreNames.contains(table)) db = await connect(name, table);
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(table, mode);
      const request     = fn(transaction.objectStore(table));
      transaction.oncomplete = () => resolve(request?.result);
      transaction.onerror    = () => reject(transaction.error);
      transaction.onabort    = () => reject(transaction.error);
    });
  }

  return {
    holds   : 'clone',
    sync    : false,
    clear   : ()           => run('readwrite', store => store.clear()).then(() => {}),
    delete  : key          => run('readwrite', store => store.delete(key)).then(() => {}),
    get     : key          => run('readonly',  store => store.get(key)),
    keys    : ()           => run('readonly',  store => store.getAllKeys()),
    set     : (key, value) => run('readwrite', store => store.put(value, key)).then(() => {}),
    values  : ()           => run('readonly',  store => store.getAll()),
  };
}

// :::::: CACHE API

function cache ({ name = 'bunker' } = {}) {
  const open = () => caches.open(name);
  return {
    holds  : 'response',
    sync   : false,
    clear  : async ()           => { await caches.delete(name); },
    delete : async key          => { await (await open()).delete(key); },
    get    : async key          => (await (await open()).match(key)) ?? undefined,
    keys   : async ()           => (await (await open()).keys()).map(request => request.url),
    set    : async (key, value) => { await (await open()).put(key, value); },
  };
}

// :::::: EXPORT

const drivers = { cache, cookie, indexeddb, local, memory, session };

// a name and options, a function of the options, or a driver object as it is
const driverOf = (driver, options) => typeof driver === 'string' ? drivers[driver]?.(options) ?? null
  : typeof driver === 'function' ? driver(options)
  : driver;

export { driverOf, drivers };
