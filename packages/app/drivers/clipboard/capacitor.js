// @rat/app :: drivers :: clipboard, capacitor (android, ios). the plugin @capacitor/clipboard of the app's
// capacitor project, through the bridge: no js of it in the build

const plugin = () => globalThis.Capacitor?.Plugins?.Clipboard ?? Promise.reject(new Error('[rat] clipboard: @capacitor/clipboard is not installed in the capacitor project'));

export const can   = { read: true, write: true };
export const read  = async () => (await plugin().read()).value ?? '';
export const write = text => plugin().write({ string: text });
