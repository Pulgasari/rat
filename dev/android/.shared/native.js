// android/.shared/native.js
//
// a plugin of the app's own capacitor project (its java under wallpaperfx/apps/<app>/android), through
// the bridge: no js of it in the build. outside capacitor the mock stands in, the ui stays usable in a
// browser for layout work
//
//   const Launcher = plugin('Launcher', { getApps: async () => ({ apps: [] }) });

export const native = Boolean(globalThis.Capacitor?.isNativePlatform?.());

export const plugin = (name, mock = {}) => globalThis.Capacitor?.Plugins?.[name] ?? mock;

// a window event the native side fires (bridge.triggerWindowJSEvent), the cleanup returned
export function onNative (type, fn) {
  addEventListener(type, fn);
  return () => removeEventListener(type, fn);
}
