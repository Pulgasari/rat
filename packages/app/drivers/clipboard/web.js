// @rat/app :: drivers :: clipboard, web. 
// reading is often not allowed: a browser asks, or refuses

const clipboard = globalThis.navigator?.clipboard;

export const 
can   = { read: !!clipboard?.readText, write: !!clipboard?.writeText },
read  = ()     => clipboard.readText(),
write = (text) => clipboard.writeText(text);
