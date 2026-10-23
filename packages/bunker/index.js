// @rat/bunker
// @ts-self-types="./index.d.ts"

/*
persistent data in four parts, the platform apis behind one interface each.
here for now, on its way to @bunker once it has proven itself in the apps.

  Store      keys and values: local, session, cookie, memory, indexeddb, cache
  Database   tables of records with a schema, each table a store
  Files      a tree of entries: the origin private file system, a granted folder
  memo       no place of its own: ttl and stale-while-revalidate around a store
  thumbs     small webp copies of images, kept in opfs

codecs turn values into what a driver holds, a schema (@rat/types or any
standard schema) checks them, store.as(Type) hands them out in a form.
*/

import './rat.js';

export { cast, register }                  from './cast.js';
export { codecs }                          from './codecs.js';
export * from './database.js';
export { drivers }                         from './drivers.js';
export { Entry, Files, createFiles }       from './files.js';
export { memo }                            from './memo.js';
export { Store, createStore }              from './store.js';
export { createThumbs }                    from './thumbs.js';
