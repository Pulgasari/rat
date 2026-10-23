// @rat/app :: offline
// a service worker: the app works offline once it was open, browsers offer to install it.
// the app's sw.js next to its src (options.src names another), see sw.js

async function offline (options, { app }) {
  if (!navigator.serviceWorker) return null;
  const url = new URL(options.src ?? 'sw.js', new URL(app.src ?? location.href, app.baseURI));
  return navigator.serviceWorker.register(url).catch(error => { console.warn('[rat] offline:', error.message); return null; });
}

// :::::: EXPORT

export default offline;
