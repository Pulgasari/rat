// @rat/app :: drivers :: clipboard, web. reading is often not allowed: a browser asks, or refuses

const clipboard = globalThis.navigator?.clipboard;

export const can   = { read: !!clipboard?.readText, write: !!clipboard?.writeText };
export const read  = () => clipboard.readText();
export const write = text => clipboard.writeText(text);
