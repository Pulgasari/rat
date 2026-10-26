// @rat/app :: drivers :: files, deno desktop: the files folder in the app's data folder. the deno side is host/deno.js

import { Handle, fromBase64, toBase64 } from '../_fs.js';

const call = (name, ...args) => globalThis.bindings[`rat:fs.${name}`](...args);

const fs = {
  list   : path => call('list', path),
  mkdir  : path => call('mkdir', path),
  read   : async path => fromBase64(await call('read', path)),
  remove : (path, recursive) => call('remove', path, recursive),
  stat   : path => call('stat', path),
  write  : (path, bytes) => call('write', path, toBase64(bytes)),
};

const root = async () => {
  const path = `${await call('data')}/files`;
  await fs.mkdir(path);
  return new Handle(fs, path);
};

export { fs };
export default root;
