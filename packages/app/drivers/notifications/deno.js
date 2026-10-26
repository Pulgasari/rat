// @rat/app :: drivers :: notifications, deno desktop: the system's notifications, nothing to ask.
// the deno side is host/deno.js

export const can        = true;
export const permission = async () => 'granted';
export const request    = async () => 'granted';
export const show       = ({ body = '', title }) => globalThis.bindings['rat:notifications.show'](title, body);
