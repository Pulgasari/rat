// @rat/app :: mods

/*
the parts rat provides that not every app needs, each a module of its own here.
config.rat.js names the ones it wants by their name, beside its other keys. each lands
on the app (RAT.app.<name>), in the order written:

  export default {
    name          : 'podcasts',
    clipboard     : true,                     // the same in the browser, on android, on the desktop (drivers.js)
    database      : { schema: { podcasts: { id: Id, title: String }, folders: FOLDERS } },
    dialogs       : true,                     // alert, confirm, prompt
    external      : true,                     // open a url outside the app
    files         : true,                     // the origin private file system, the app's data folder natively
    folders       : { accept: 'md, epub' },   // folders the user grants, in the database's table folders
    hotkeys       : { 'ctrl+1': 'go[podcasts]', 'space': 'toggle-player', 'escape': 'rat:toggle[context]' },
    icons         : { close: 'lucide:x' },      // short names for <svg-icon icon='close'>
    notifications : true,                     // the system's notifications
    offline       : true,                     // a service worker: offline once open, installable (sw.js)
    store         : { driver: 'local' },      // keys and values
    thumbnails    : { proxy: '…{url}' },      // small copies of images in files
  };

true takes the defaults. a module is loaded only when an app names it.
*/

const MODS = {
  clipboard     : () => import('./modules/clipboard.js'),
  database      : () => import('./modules/database.js'),
  dialogs       : () => import('./modules/dialogs.js'),
  external      : () => import('./modules/external.js'),
  files         : () => import('./modules/files.js'),
  folders       : () => import('./modules/folders.js'),
  hotkeys       : () => import('./modules/hotkeys.js'),
  icons         : () => import('./modules/icons.js'),
  notifications : () => import('./modules/notifications.js'),
  offline       : () => import('./offline.js'),
  store         : () => import('./modules/store.js'),
  thumbnails    : () => import('./modules/thumbnails.js'),
};

// every key of the config that names a mod onto the app, in order. one the app has already is left out
async function useMods (app, config) {
  for (const [name, value] of Object.entries(config)) {
    if (!Object.hasOwn(MODS, name) || value === false || value == null) continue;
    if (name in app) { console.warn(`[rat] mod "${name}": the app has a ${name} already, left out`); continue; }

    const { default: make } = await MODS[name]();
    const result = await make(value === true ? {} : value, { app, config });
    Object.defineProperty(app, name, { configurable: true, enumerable: true, value: result });
  }
}

// :::::: EXPORT

export { MODS, useMods };
