// @rat/language-server :: styles
// the class names of the workspace's stylesheets, for completion in selectors
// (<div.|) and class="". every .css except node_modules and build output; the
// file list is read again after a few seconds, a file when it changed. node only.

import fs   from 'node:fs';
import path from 'node:path';

import { classesOf } from '@htx/analyzer';

const LIST_TTL = 5000;
const SKIP     = /(^|[\\/])(node_modules|dist|build|\.git)([\\/]|$)/;

const files = new Map;   // path -> { time, names }
let listing = { at: 0, paths: [], root: null };

function stylesheets (root) {
  const now = Date.now();
  if (listing.root !== root || now - listing.at > LIST_TTL) {
    let paths = [];
    try { paths = fs.readdirSync(root, { recursive: true }).filter(file => file.endsWith('.css') && !SKIP.test(file)).slice(0, 1000).map(file => path.join(root, file)); }
    catch {}
    listing = { at: now, paths, root };
  }
  return listing.paths;
}

function classesOfWorkspace (root) {
  const out = new Set;
  for (const file of stylesheets(root)) {
    let time;
    try { time = fs.statSync(file).mtimeMs; } catch { continue; }
    let cached = files.get(file);
    if (!cached || cached.time !== time) {
      let text = '';
      try { text = fs.readFileSync(file, 'utf8'); } catch {}
      files.set(file, cached = { names: classesOf(text), time });
    }
    for (const name of cached.names) out.add(name);
  }
  return out;
}

export { classesOfWorkspace };
