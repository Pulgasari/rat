// cosmonaut :: modules/browser.js
//
// the native side: the Browser plugin (bridge/BrowserPlugin.java, tabs are native content webviews, see
// ARCHITECTURE.md of the native project) or the mock outside capacitor. its "state" events are the one
// source of the tabs, the chrome keeps no list of its own (state.rat.js holds the last one)

import { plugin as native } from '../../.shared/native.js';

import { createMock } from './mock.js';

export const plugin = native('Browser', null) ?? createMock();

// @capacitor/filesystem, registered on Capacitor.Plugins by cap sync. null on the web
export const filesystem = native('Filesystem', null);

// a call whose rejection (the mock, an older native build) does not escape: the chrome never depends
// on these succeeding
export async function call (method, args = {}) {
  try   { return await plugin[method](args); }
  catch { return undefined; }
}
