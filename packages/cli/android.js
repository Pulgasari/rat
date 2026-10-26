// @rat/cli :: android

/*
rat build --target android: the app as an android app, through capacitor. the capacitor project is made
here, beside the app (.capacitor/, not in git), from what config.rat.js says:

  android : { id: 'dev.pulgasari.files', name: 'Files', plugins: ['filesync'] }   // all optional

  1. the web build of the app (target android: capacitor's drivers only) into .capacitor/www (build.js)
  2. the project: capacitor.config.json, a package.json with the plugins the app's mods need (files ->
     @capacitor/filesystem, dialogs -> @capacitor/dialog …), npm install, cap add android once
  3. rat's own plugins (@rat/app/native/android: Saf and NativeHttp always, the folders named in plugins)
     copied into the android project, registered in MainActivity, their manifest entries added. the app's
     icon, its color on the bars and the launch screen (android-res.js: android.icon, android.color)
  4. cap sync android, then gradle where an android sdk is (ANDROID_HOME): .capacitor/<name>.apk, a debug
     build, installable. without a sdk the project is ready for android studio or ci
*/

import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { copyFile, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import { basename, dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

import { appConfig } from '@rat/dev';

import { resources } from './android-res.js';
import { color, print, warn } from './wizard.js';

const NATIVE  = fileURLToPath(new URL('../app/native/android/', import.meta.url));
const SHARP   = '^0.35.0';   // the icons, android-res.js
const VERSION = '^8.0.0';
const MARK    = 'rat:plugins';

// the npm plugins the capacitor drivers of a mod call (@rat/app/drivers/*/capacitor.js)
const PLUGINS = {
  clipboard     : ['@capacitor/clipboard'],
  database      : ['@capacitor-community/sqlite'],
  dialogs       : ['@capacitor/dialog'],
  external      : ['@capacitor/app-launcher', '@capacitor/browser'],
  files         : ['@capacitor/filesystem'],
  notifications : ['@capacitor/local-notifications'],
  store         : ['@capacitor/preferences'],
  thumbnails    : ['@capacitor/filesystem'],
};

const execute = (command, args, cwd) => new Promise((done, fail) => {
  print(color.gray(`${relative('.', cwd) || '.'} $ ${[command, ...args].join(' ')}`));
  spawn(command, args, { cwd, shell: process.platform === 'win32', stdio: 'inherit' })
    .on('error', fail)
    .on('exit', code => code === 0 ? done() : fail(new Error(`${command} exited with ${code}`)));
});

// :::::: THE PROJECT

// where the project of an app lives, and its web build inside it
export async function projectOf (root) {
  const { file } = await appConfig(root, 'name');
  if (!file) throw new Error(`[rat] android: no config.rat.js for ${root}`);
  const project = join(dirname(file), '.capacitor');
  return { config: file, project, www: join(project, 'www') };
}

async function settingsOf (root) {
  const { file, value: android = {} } = await appConfig(root, 'android');
  const name = android.name ?? (await appConfig(root, 'name')).value ?? basename(dirname(file));
  const slug = basename(dirname(file)).toLowerCase().replace(/[^a-z0-9]/g, '');

  // a mod is named when its key is there: a value that is no plain literal ({ schema: { folders: FOLDERS } }) counts too
  const named = async mod => {
    try   { const { value } = await appConfig(root, mod); return value != null && value !== false; }
    catch { return true; }
  };

  const mods = [];
  for (const mod of Object.keys(PLUGINS)) if (await named(mod)) mods.push(mod);

  return { android, config: file, id: android.id ?? `dev.rat.${slug}`, mods, name, native: android.plugins ?? [], slug };
}

async function scaffold (project, { id, mods, name, slug }) {
  await mkdir(join(project, 'www'), { recursive: true });

  await writeFile(join(project, 'capacitor.config.json'), JSON.stringify({ appId: id, appName: name, webDir: 'www' }, null, 2) + '\n');

  const plugins      = [...new Set(mods.flatMap(mod => PLUGINS[mod]))].sort();
  const dependencies = { ...Object.fromEntries(['@capacitor/android', '@capacitor/cli', '@capacitor/core', ...plugins].map(name => [name, VERSION])), sharp: SHARP };
  await writeFile(join(project, 'package.json'), JSON.stringify({ dependencies, name: `rat-${slug}-android`, private: true }, null, 2) + '\n');

  print(`${name}: ${plugins.length ? plugins.join(', ') : 'no npm plugins'}`);
  await execute('npm', ['install', '--no-audit', '--no-fund'], project);

  // the id is the java package of the project: another one makes it anew
  const gradle = join(project, 'android', 'app', 'build.gradle');
  const before = existsSync(gradle) ? (await readFile(gradle, 'utf8')).match(/applicationId\s+"([^"]+)"/)?.[1] : null;
  if (before && before !== id) {
    warn(`the id changed (${before} -> ${id}): the android project is made anew`);
    await rm(join(project, 'android'), { force: true, recursive: true });
  }
  if (!existsSync(join(project, 'android'))) await execute('npx', ['cap', 'add', 'android'], project);
}

// :::::: RAT'S OWN PLUGINS

// every java file goes where its package line says, a class annotated @CapacitorPlugin is registered
async function copyJava (dir, javaDir, registered) {
  for (const file of (await readdir(dir)).filter(name => name.endsWith('.java'))) {
    const source = await readFile(join(dir, file), 'utf8');
    const pkg    = source.match(/^package\s+([\w.]+)\s*;/m)?.[1];
    if (!pkg) throw new Error(`[rat] android: ${file} has no package line`);
    const target = join(javaDir, ...pkg.split('.'));
    await mkdir(target, { recursive: true });
    await copyFile(join(dir, file), join(target, file));
    if (/@CapacitorPlugin\b/.test(source)) registered.push(`${pkg}.${file.slice(0, -'.java'.length)}`);
  }
}

// a permission before </manifest>, a service before </application>, cleartext on <application>
function addToManifest (xml, fragment) {
  for (const permission of fragment.permissions ?? []) {
    if (!xml.includes(`"${permission}"`)) xml = xml.replace('</manifest>', `    <uses-permission android:name="${permission}" />\n</manifest>`);
  }
  for (const service of fragment.services ?? []) {
    if (xml.includes(`"${service.name}"`)) continue;
    const type = service.foregroundServiceType ? `\n            android:foregroundServiceType="${service.foregroundServiceType}"` : '';
    xml = xml.replace(/\n([ \t]*)<\/application>/, (_, indent) => `\n        <service\n            android:name="${service.name}"\n            android:exported="false"${type} />\n${indent}</application>`);
  }
  if (fragment.cleartext && !xml.includes('usesCleartextTraffic')) xml = xml.replace('<application', '<application\n        android:usesCleartextTraffic="true"');
  return xml;
}

async function findFile (dir, name) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) { const hit = await findFile(path, name); if (hit) return hit; }
    else if (entry.name === name) return path;
  }
  return null;
}

async function addNative (project, native) {
  const main       = join(project, 'android', 'app', 'src', 'main');
  const javaDir    = join(main, 'java');
  const registered = [];

  await copyJava(NATIVE, javaDir, registered);

  let manifest = await readFile(join(main, 'AndroidManifest.xml'), 'utf8');
  for (const name of native) {
    const dir = join(NATIVE, name);
    if (!existsSync(dir)) throw new Error(`[rat] android: no plugin "${name}" in ${NATIVE}`);
    await copyJava(dir, javaDir, registered);
    if (existsSync(join(dir, 'manifest.json'))) manifest = addToManifest(manifest, JSON.parse(await readFile(join(dir, 'manifest.json'), 'utf8')));
  }
  await writeFile(join(main, 'AndroidManifest.xml'), manifest);

  // the template's MainActivity, or one written here before: local plugins register before super.onCreate()
  const activity = await findFile(javaDir, 'MainActivity.java');
  const source   = await readFile(activity, 'utf8');
  const pkg      = source.match(/^package\s+([\w.]+)\s*;/m)?.[1];
  if (!source.includes(MARK) && !/class MainActivity extends BridgeActivity\s*\{\s*\}/.test(source)) {
    return warn(`MainActivity is not the template's anymore, register by hand: ${registered.join(', ')}`);
  }

  await writeFile(activity, `package ${pkg};

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    // ${MARK}: rat's own plugins (@rat/app/native/android), written by rat build --target android
    @Override
    public void onCreate (Bundle savedInstanceState) {
${registered.map(name => `        registerPlugin(${name}.class);`).join('\n')}
        super.onCreate(savedInstanceState);
    }
}
`);
  print(`rat's plugins: ${registered.map(name => name.split('.').pop()).join(', ')}`);
}

// :::::: GRADLE

const sdk = () => process.env.ANDROID_HOME || process.env.ANDROID_SDK_ROOT || null;

async function assemble (project, slug) {
  if (!sdk()) {
    return warn(`no android sdk (ANDROID_HOME): the project is ready in ${relative('.', project)}/android, build it there (android studio, ./gradlew assembleDebug) or in ci`);
  }
  const android = join(project, 'android');
  await execute(process.platform === 'win32' ? 'gradlew.bat' : './gradlew', ['assembleDebug', '--console=plain'], android);
  const apk = join(project, `${slug}.apk`);
  await copyFile(join(android, 'app', 'build', 'outputs', 'apk', 'debug', 'app-debug.apk'), apk);
  print(color.green(`the apk: ${relative('.', apk)}`));
}

// :::::: AFTER THE WEB BUILD

export async function android (root) {
  const { project } = await projectOf(root);
  const settings    = await settingsOf(root);

  await scaffold(project, settings);
  await addNative(project, settings.native);
  const { color: tint, icon } = await resources(project, settings.config, settings.android);
  print(`${settings.name}: ${icon ? `the icon of ${relative('.', icon)}, ` : ''}${tint} on the bars and the launch screen`);
  await execute('npx', ['cap', 'sync', 'android'], project);
  await assemble(project, settings.slug);
}
