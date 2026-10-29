// .github/scripts/android.mjs
// the android apps: rat build --target android each (packages/cli/android.js), the apk named after
// config.android.name, then a release with the apks as plain files (an artifact is always a zip).
// APPS (the input of the run) overrides config.android.apps. a failed app does not stop the others,
// the run fails at the end and names it

import { execFileSync, spawnSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

import config from '../config.js';

const rat  = fileURLToPath(new URL('../../', import.meta.url));
const apps = join(rat, 'dev/apps');
const out  = join(rat, '.apks');
const { keep, name, timezone } = config.android;

const PREFIX = 'apk-';

const run = (command, args) => spawnSync(command, args, { cwd: rat, stdio: 'inherit' }).status === 0;
const gh  = (...args) => execFileSync('gh', args, { cwd: rat, encoding: 'utf8' });

// :::::: WHICH

const hasAndroid = app => /^\s*android\s*:/m.test(readFileSync(join(apps, app, 'config.rat.js'), 'utf8'));

function chosen () {
  const given = (process.env.APPS ?? '').split(/\s+/).filter(Boolean);
  if (given.length) return given;
  if (config.android.apps.length) return config.android.apps;
  return readdirSync(apps).filter(app => existsSync(join(apps, app, 'config.rat.js')) && hasAndroid(app));
}

// :::::: NAME

// { yyyy, MM, dd, HH, mm } of now, in the time zone of the config
function stamp () {
  const parts = new Intl.DateTimeFormat('en-GB', { day: '2-digit', hour: '2-digit', hourCycle: 'h23', minute: '2-digit', month: '2-digit', timeZone: timezone, year: 'numeric' }).formatToParts(new Date);
  const part  = type => parts.find(entry => entry.type === type).value;
  return { HH: part('hour'), MM: part('month'), dd: part('day'), mm: part('minute'), yyyy: part('year') };
}

const fill = (template, values) => template.replace(/\{(\w+)\}/g, (all, key) => values[key] ?? all);

// :::::: BUILD

const time   = stamp();
const failed = [];
const built  = [];

mkdirSync(out, { recursive: true });

for (const app of chosen()) {
  console.log(`\n::group::${app}`);
  const ok  = run('npx', ['rat', 'build', `dev/apps/${app}`, '--target', 'android']);
  const dir = join(apps, app, '.capacitor');
  const apk = ok && existsSync(dir) ? readdirSync(dir).find(file => file.endsWith('.apk')) : null;
  console.log('::endgroup::');

  if (!apk) { failed.push(app); continue; }
  const file = join(out, fill(name, { ...time, app }));
  copyFileSync(join(dir, apk), file);
  built.push(file);
  console.log(`${app}: ${file}`);
}

// :::::: RELEASE

if (built.length) {
  const tag = `${PREFIX}${fill('{yyyy}{MM}{dd}{HH}{mm}', time)}`;
  gh('release', 'create', tag, ...built, '--prerelease', '--target', process.env.GITHUB_SHA ?? 'HEAD', '--title', `apks ${fill('{yyyy}-{MM}-{dd} {HH}:{mm}', time)}`, '--notes', `debug builds, signed with the throwaway key of the run: ${built.length} app(s)`);
  console.log(`release ${tag}`);

  // the newest keep releases of apks stay
  const tags = JSON.parse(gh('release', 'list', '--limit', '200', '--json', 'tagName')).map(release => release.tagName).filter(tag => tag.startsWith(PREFIX)).sort().reverse();
  for (const old of tags.slice(keep)) gh('release', 'delete', old, '--yes', '--cleanup-tag');
}

if (failed.length) {
  console.log(`::error::did not build: ${failed.join(' ')}`);
  process.exit(1);
}
