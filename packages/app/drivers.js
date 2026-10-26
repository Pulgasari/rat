// @rat/app :: drivers

/*
a mod has one api, a driver per shell does the work (md/concepts/rat-drivers.md):

  mod -> shell -> how to load its driver

the driver of the shell rat runs in, else the web one. config.rat.js may name one
for a mod: clipboard: { driver: 'web' }. in a build for one target (__RAT_TARGET__)
the drivers of the other shells are not part of it: their entry is false.
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
};

function driverOf (mod, named) {
  const drivers = DRIVERS[mod];
  if (!drivers) throw new Error(`[rat] no drivers for "${mod}"`);
  if (named && !drivers[named]) throw new Error(`[rat] ${mod}: no driver "${named}", ${Object.keys(drivers).filter(key => drivers[key]).join(', ')} are`);
  return (drivers[named] || drivers[shell] || drivers.web)();
}

// :::::: EXPORT

export { DRIVERS, driverOf };
