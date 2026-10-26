// @rat/app :: drivers :: clipboard, deno desktop. the deno side is host/deno.js

export const 
can   = { read: true, write: true },
read  = ()   => globalThis.bindings['rat:clipboard.read'](),
write = text => globalThis.bindings['rat:clipboard.write'](text);
