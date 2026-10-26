// @rat/cli :: build

import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';

import rat, { TARGETS, appConfig } from '@rat/dev';
import { build } from 'vite';

import { android, projectOf } from '../android.js';
import { color, print, warn } from '../wizard.js';

export const options = {
  target : { short: 't', type: 'string' },
};

const execute = (command, args, cwd) => new Promise((done, fail) => {
  print(color.gray(`${relative('.', cwd) || '.'} $ ${[command, ...args].join(' ')}`));
  spawn(command, args, { cwd, shell: process.platform === 'win32', stdio: 'inherit' })
    .on('error', fail)
    .on('exit', code => code === 0 ? done() : fail(new Error(`${command} exited with ${code}`)));
});

// after the build: the shell of the target takes it. its project is named in config.rat.js
const AFTER = {
  // android: the capacitor project made beside the app (android.js), or the one capacitor in config.rat.js names
  async android (root) { (await appConfig(root, 'capacitor')).value ? await capacitor(root, 'android') : await android(root); },
  async ios     (root) { await capacitor(root, 'ios'); },

  // desktop : the deno entrypoint of the app, which opens the window and hands it to host() of @rat/app
  async desktop (root) {
    const { file, value } = await appConfig(root, 'desktop');
    if (!value) return warn(`no desktop in config.rat.js: the deno entrypoint of the app (desktop: './desktop.js'), see host/deno.js of @rat/app`);
    const entry = resolve(dirname(file), value);
    await execute('deno', ['desktop', entry], dirname(entry));
  },
};

async function capacitor (root, platform) {
  const { file, value } = await appConfig(root, 'capacitor');
  if (!value) return warn(`no capacitor in config.rat.js: the folder of the app's capacitor project (capacitor: '../native/noisy'), its webDir the outDir of this build`);
  const project = resolve(dirname(file), value);
  if (!existsSync(project)) throw new Error(`[rat] capacitor: ${project} does not exist`);
  await execute('npx', ['cap', 'sync', platform], project);
}

// a vite.config.js of the app is taken as it is (it adds @rat/dev itself), else rat's own
export async function run ([dir = '.'], { target }) {
  if (target && !TARGETS.includes(target)) throw new Error(`[rat] target "${target}": ${TARGETS.join(', ')} are`);
  if (target) process.env.RAT_TARGET = target;

  const root   = resolve(dir);
  const config = ['vite.config.js', 'vite.config.mjs'].map(name => join(root, name)).find(existsSync);

  // android: the web build goes into the capacitor project (android.js), not into build.outDir
  const own    = target === 'android' && !(await appConfig(root, 'capacitor')).value;
  const outDir = own ? (await projectOf(root)).www : undefined;
  if (own && config) warn('a vite.config.js of the app keeps its own outDir: the android project takes .capacitor/www');

  await build(config ? { configFile: config, root } : { configFile: false, plugins: [rat.vite({ outDir })], root });

  await AFTER[target]?.(root);
}
