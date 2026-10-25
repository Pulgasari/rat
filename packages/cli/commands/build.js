// @rat/cli :: build

import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

import rat from '@rat/dev';
import { build } from 'vite';

export const options = {};

// a vite.config.js of the app is taken as it is (it adds @rat/dev itself), else rat's own
export async function run ([dir = '.']) {
  const root   = resolve(dir);
  const config = ['vite.config.js', 'vite.config.mjs'].map(name => join(root, name)).find(existsSync);
  await build(config ? { configFile: config, root } : { configFile: false, plugins: [rat.vite()], root });
}
