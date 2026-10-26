// @rat/app :: drivers :: clipboard, capacitor (android, ios). 
// the plugin @capacitor/clipboard of the app's capacitor project,
// through the bridge: no js of it in the build

const msg = '[rat] clipboard: @capacitor/clipboard is not installed in the capacitor project.';
const plugin = () => globalThis.Capacitor?.Plugins?.Clipboard ?? Promise.reject(new Error(msg));     

export const
can   = { read: true, write: true },
read  = async () => (await plugin().read()).value ?? '',
write = text     => plugin().write({ string: text });
