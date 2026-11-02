// module: clipboard

let can, read, write;

if (platform === 'capacitor') {
  const plugin = (await import('_capacitor.js')).plugin;
  const Clipboard = () => plugin('Clipboard', '@capacitor/clipboard');
  can   = { read: true, write: true };
  read  = async ()     => (await (await Clipboard()).read()).value ?? '';
  write = async (text) => (await Clipboard()).write({ string: text });
}

if (platform === 'deno') {
  can   = { read: true, write: true };
  read  = ()     => globalThis.bindings['rat:clipboard.read']();
  write = (text) => globalThis.bindings['rat:clipboard.write'](text);
}

if (platform === 'web') {
  const clipboard = globalThis.navigator?.clipboard;
  can   = { read: !!clipboard?.readText, write: !!clipboard?.writeText };
  read  = ()     => clipboard.readText();
  write = (text) => clipboard.writeText(text);
}

export { can, read, write };
