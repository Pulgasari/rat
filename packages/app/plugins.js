// @rat/app :: plugins

/*
config.rat.js names its plugins, each lands on the app (RAT.app.<name>):

  export default {
    RAT     : true,                       // globalThis.RAT; a string names it otherwise ('APP')
    plugins : {
      database : { driver: 'indexeddb', schema: { podcasts: { id: Id, title: String } } },
      files    : true,                    // the origin private file system
      hotkeys  : { 'ctrl+1': 'go[podcasts]', 'space': 'toggle-player', 'escape': 'rat:toggle[context]' },
      store    : { driver: 'local' },     // keys and values
      player   : app => createPlayer(app),   // a function is a plugin of your own: what it returns
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

const PLUGINS = {
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

// every plugin of the config onto the app, in order. a name the app has already is left out
async function usePlugins (app, config) {
  for (const [name, value] of Object.entries(config.plugins ?? {})) {
    if (value === false || value == null) continue;
    if (name in app) { console.warn(`[rat] plugin "${name}": the app has a ${name} already, left out`); continue; }

    const own = typeof value === 'function';
    if (!own && !PLUGINS[name]) { console.warn(`[rat] plugin "${name}": unknown, a function makes one of your own`); continue; }

    const result = own ? await value(app, config) : await PLUGINS[name](value === true ? {} : value, { app, config });
    Object.defineProperty(app, name, { configurable: true, enumerable: true, value: result });
  }
}

// :::::: EXPORT

export { PLUGINS, usePlugins };
