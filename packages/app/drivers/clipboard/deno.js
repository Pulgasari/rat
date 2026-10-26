// @rat/app :: drivers :: clipboard, deno desktop. the deno side is host/deno.js

export const can   = { read: true, write: true };
export const read  = () => globalThis.bindings['rat:clipboard.read']();
export const write = text => globalThis.bindings['rat:clipboard.write'](text);
