// @rat/app :: drivers

/*
a mod has one api, a driver per shell does the work (md/concepts/rat-drivers.md):

  mod -> shell -> how to load its driver

the driver of the shell rat runs in, else the web one. config.rat.js may name one
for a mod: clipboard: { driver: 'web' }. in a build for one target (__RAT_TARGET__)
the drivers of the other shells are not part of it: their entry is false.

database, files and store sit on @rat/bunker: their driver module gives a bunker
driver (a name like 'indexeddb', or a function that makes one). there `driver`
may name a bunker driver as well: store: { driver: 'memory' } (bunkerDriverOf).
*/

import { TARGET, shell } from './platform.js';

const CAPACITOR = TARGET == null || TARGET === 'android' || TARGET === 'ios';
const DENO      = TARGET == null || TARGET === 'desktop';

const DRIVERS = {
  clipboard : {
    capacitor : CAPACITOR && (() => import('./drivers/clipboard/capacitor.js')),
    deno      : DENO      && (() => import('./drivers/clipboard/deno.js')),
    web       : () => import('./drivers/clipboard/web.js'),
  },
  database : {
    capacitor : CAPACITOR && (() => import('./drivers/database/capacitor.js')),
    deno      : DENO      && (() => import('./drivers/database/deno.js')),
    web       : () => import('./drivers/database/web.js'),
  },
  dialogs : {
    capacitor : CAPACITOR && (() => import('./drivers/dialogs/capacitor.js')),
    web       : () => import('./drivers/dialogs/web.js'),
  },
  external : {
    capacitor : CAPACITOR && (() => import('./drivers/external/capacitor.js')),
    deno      : DENO      && (() => import('./drivers/external/deno.js')),
    web       : () => import('./drivers/external/web.js'),
  },
  files : {
    capacitor : CAPACITOR && (() => import('./drivers/files/capacitor.js')),
    deno      : DENO      && (() => import('./drivers/files/deno.js')),
    web       : () => import('./drivers/files/web.js'),
  },
  folders : {
    capacitor : CAPACITOR && (() => import('./drivers/folders/capacitor.js')),
    deno      : DENO      && (() => import('./drivers/folders/deno.js')),
    web       : () => import('./drivers/folders/web.js'),
  },
  notifications : {
    capacitor : CAPACITOR && (() => import('./drivers/notifications/capacitor.js')),
    deno      : DENO      && (() => import('./drivers/notifications/deno.js')),
    web       : () => import('./drivers/notifications/web.js'),
  },
  store : {
    capacitor : CAPACITOR && (() => import('./drivers/store/capacitor.js')),
    deno      : DENO      && (() => import('./drivers/store/deno.js')),
    web       : () => import('./drivers/store/web.js'),
  },
};

function driverOf (mod, named) {
  const drivers = DRIVERS[mod];
  if (!drivers) throw new Error(`[rat] no drivers for "${mod}"`);
  if (named && !drivers[named]) throw new Error(`[rat] ${mod}: no driver "${named}", ${Object.keys(drivers).filter(key => drivers[key]).join(', ')} are`);
  return (drivers[named] || drivers[shell] || drivers.web)();
}

// a shell's driver, or a bunker driver by its name ('indexed-db' is 'indexeddb')
async function bunkerDriverOf (mod, named) {
  if (named && !Object.hasOwn(DRIVERS[mod], named)) return typeof named === 'string' ? named.replace(/-/g, '') : named;
  return (await driverOf(mod, named)).default;
}

// :::::: EXPORT

export { DRIVERS, bunkerDriverOf, driverOf };
