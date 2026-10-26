// @rat/app :: drivers :: files, capacitor (android, ios): @capacitor/filesystem, the app's data folder

import { plugin } from '../_capacitor.js';
import { Handle, fromBase64, toBase64 } from '../_fs.js';

const Filesystem = () => plugin('Filesystem', '@capacitor/filesystem');

const kindOf = type => type === 'directory' ? 'directory' : 'file';

// directory: one of capacitor's ('DATA' …) with paths inside it, none for absolute paths
function fsOf (directory) {
  const at = path => directory ? { directory, path } : { path };

  const fs = {
    list   : async path => (await (await Filesystem()).readdir(at(path))).files.map(file => ({ kind: kindOf(file.type), name: file.name })),
    mkdir  : async path => { await (await Filesystem()).mkdir({ ...at(path), recursive: true }).catch(() => {}); },
    read   : async path => fromBase64((await (await Filesystem()).readFile(at(path))).data),
    remove : async (path, recursive) => (await fs.stat(path))?.kind === 'directory' ? (await Filesystem()).rmdir({ ...at(path), recursive }) : (await Filesystem()).deleteFile(at(path)),
    write  : async (path, bytes) => { await (await Filesystem()).writeFile({ ...at(path), data: toBase64(bytes), recursive: true }); },

    async stat (path) {
      try   { const stat = await (await Filesystem()).stat(at(path)); return { kind: kindOf(stat.type), modified: stat.mtime, size: stat.size }; }
      catch { return null; }
    },
  };

  return fs;
}

const data = fsOf('DATA');

const root = async () => { await data.mkdir('files'); return new Handle(data, 'files'); };

export { fsOf };
export default root;
