// @rat/language-server :: manifests
// the custom elements manifests of a workspace, for the element analysis: its own
// custom-elements.json and the one every dependency names in "customElements" of
// its package.json. a file is read again when it changed. node only.

import fs   from 'node:fs';
import path from 'node:path';

const files = new Map;   // path -> { manifest, time }

function read (file) {
  let time;
  try { time = fs.statSync(file).mtimeMs; } catch { return null; }
  const cached = files.get(file);
  if (cached?.time === time) return cached;
  let manifest = null;
  try { manifest = JSON.parse(fs.readFileSync(file, 'utf8')); } catch {}
  const entry = { manifest, time };
  files.set(file, entry);
  return entry;
}

function manifestsOf (root) {
  const paths = new Set([path.join(root, 'custom-elements.json')]);

  const pkg = read(path.join(root, 'package.json'))?.manifest;
  for (const name of Object.keys({ ...pkg?.dependencies, ...pkg?.devDependencies, ...pkg?.peerDependencies })) {
    const dependency = read(path.join(root, 'node_modules', name, 'package.json'))?.manifest;
    if (dependency?.customElements) paths.add(path.join(root, 'node_modules', name, dependency.customElements));
  }

  const out = [];
  for (const source of paths) {
    const entry = read(source);
    if (entry?.manifest) out.push({ manifest: entry.manifest, source, time: entry.time });
  }
  return out;
}

export { manifestsOf };
