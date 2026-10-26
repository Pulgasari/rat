// @rat/app :: drivers :: external, deno desktop: the system's default app. the deno side is host/deno.js

export const open = url => globalThis.bindings['rat:external.open'](url);
