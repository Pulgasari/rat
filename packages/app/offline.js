// @rat/app :: offline
// a service worker: the app works offline once it was open, browsers offer to install it.
// the app's sw.js next to its src (options.src names another), see sw.js

import { native } from './platform.js';

// in a native shell the files are in the app: no worker, it would serve an old build after an update
async function offline (options, { app }) {
  if (native || !navigator.serviceWorker) return null;
  const url = new URL(options.src ?? 'sw.js', new URL(app.src ?? location.href, app.baseURI));
  return navigator.serviceWorker.register(url).catch(error => { console.warn('[rat] offline:', error.message); return null; });
}

// :::::: EXPORT

export default offline;
