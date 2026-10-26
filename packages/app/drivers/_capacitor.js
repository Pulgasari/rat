// @rat/app :: drivers :: capacitor. a plugin of the app's capacitor project, through the bridge: no js of it
// in the build. a missing one rejects with the package to install

const plugin = (name, pkg) => globalThis.Capacitor?.Plugins?.[name] ?? Promise.reject(new Error(`[rat] ${pkg} is not installed in the capacitor project`));

export { plugin };
