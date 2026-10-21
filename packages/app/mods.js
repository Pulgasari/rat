// @rat/app :: mods

/*
the parts rat provides that not every app needs. config.rat.js names the mods
it wants, each lands on the app (RAT.app.<name>):

  export default {
    RAT  : true,                          // globalThis.RAT; a string names it otherwise ('APP')
    mods : {
      database : { driver: 'indexeddb', schema: { podcasts: { id: Id, title: String } } },
      files    : true,                    // the origin private file system
      hotkeys  : { 'ctrl+1': 'go[podcasts]', 'space': 'toggle-player', 'escape': 'rat:toggle[context]' },
      store    : { driver: 'local' },     // keys and values
    },
  };

true takes the defaults. database and store are named after the app (name in
the config, else its id), 'indexed-db' is 'indexeddb'. a hotkey's string is a
command as in markup: go[x], rat:toggle[x], a name of app.commands.
*/

import { command }       from '@rat/commands';
import { createHotkeys } from '@rat/hotkeys';

const nameOf   = (options, config) => options.name ?? config.id ?? config.name ?? 'rat';
const driverOf = driver => driver?.replace?.(/-/g, '') ?? driver;

const MODS = {
  async database (options, { app, config }) {
    const { createDatabase } = await import('@rat/bunker');
    return createDatabase({ ...options, driver: driverOf(options.driver ?? 'indexeddb'), name: nameOf(options, config) });
  },

  async files (options) {
    const { createFiles } = await import('@rat/bunker');
    return createFiles(options);
  },

  hotkeys (map, { app }) {
    const run   = text => event => command(app, text, event);
    const specs = Object.fromEntries(Object.entries(map).map(([keys, value]) =>
      [keys, typeof value === 'string' ? run(value) : typeof value?.command === 'string' ? { ...value, command: run(value.command) } : value]));
    return createHotkeys().define(specs);
  },

  async store (options, { config }) {
    const { createStore } = await import('@rat/bunker');
    return createStore({ ...options, driver: driverOf(options.driver ?? 'local'), name: nameOf(options, config) });
  },
};

// every mod of the config onto the app, in order. an unknown name, or one the app has already, is left out
async function useMods (app, config) {
  for (const [name, value] of Object.entries(config.mods ?? {})) {
    if (value === false || value == null) continue;
    if (!MODS[name]) { console.warn(`[rat] mod "${name}": there is none, ${Object.keys(MODS).join(', ')} are`); continue; }
    if (name in app) { console.warn(`[rat] mod "${name}": the app has a ${name} already, left out`); continue; }

    const result = await MODS[name](value === true ? {} : value, { app, config });
    Object.defineProperty(app, name, { configurable: true, enumerable: true, value: result });
  }
}

// :::::: EXPORT

export { MODS, useMods };
