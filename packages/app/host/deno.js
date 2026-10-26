// @rat/app :: host :: deno

/*
the deno side of rat's drivers in a Deno Desktop app: a binding per call, under rat: so they do not mix
with the app's own. the app's deno entrypoint hands its window over:

  import { host } from '@rat/app/host/deno.js';
  host(win, { name: 'notes' });                // the window deno desktop gives it, the app's name
  win.bind('scanLibrary', path => …);          // the app's own: bindings.scanLibrary(path) in the page

name picks the data folder (database, store, files): ~/.local/share/<name> on linux ($XDG_DATA_HOME),
~/Library/Application Support/<name> on macos, %APPDATA%\<name> on windows. data sets it directly.

runs in deno, not in the page. deno has no clipboard, dialogs or notifications of its own: the system's
tools do it (pbcopy, osascript, wl-clipboard or xclip, zenity, notify-send, xdg-open, powershell).
*/

import { DatabaseSync } from 'node:sqlite';

import { fromBase64, toBase64 } from '../drivers/_fs.js';

const OS = Deno.build.os;

// :::::: TOOLS

// a tool of the system: { code, stdout }. a missing one throws with its name
async function spawn ([command, ...args], { env, input } = {}) {
  let child;
  try { child = new Deno.Command(command, { args, env, stderr: 'piped', stdin: input == null ? 'null' : 'piped', stdout: 'piped' }).spawn(); }
  catch (error) {
    if (error instanceof Deno.errors.NotFound) throw new Error(`[rat] ${command} is not installed`);
    throw error;
  }
  if (input != null) {
    const writer = child.stdin.getWriter();
    await writer.write(new TextEncoder().encode(input));
    await writer.close();
  }
  const { code, stderr, stdout } = await child.output();
  return { code, stderr: new TextDecoder().decode(stderr).trim(), stdout: new TextDecoder().decode(stdout) };
}

// the same, a failing one rejects
async function run (command, options) {
  const { code, stderr, stdout } = await spawn(command, options);
  if (code !== 0) throw new Error(`[rat] ${command[0]}: ${stderr || `exit ${code}`}`);
  return stdout;
}

const toolOf = (tools, what) => tools[OS] ?? (() => { throw new Error(`[rat] ${what}: no tool on ${OS}`); })();

// :::::: DATA

const HOME = () => Deno.env.get('HOME') ?? Deno.env.get('USERPROFILE') ?? '.';

const DATA = {
  darwin  : () => `${HOME()}/Library/Application Support`,
  linux   : () => Deno.env.get('XDG_DATA_HOME') ?? `${HOME()}/.local/share`,
  windows : () => (Deno.env.get('APPDATA') ?? `${HOME()}/AppData/Roaming`).replaceAll('\\', '/'),
};

const dataOf = name => `${(DATA[OS] ?? DATA.linux)()}/${name}`;

// :::::: CLIPBOARD, linux takes wayland's, else x11's

const CLIPBOARD = {
  darwin  : { read: ['pbpaste'], write: ['pbcopy'] },
  linux   : Deno.env.get('WAYLAND_DISPLAY') ? { read: ['wl-paste', '--no-newline'], write: ['wl-copy'] } : { read: ['xclip', '-selection', 'clipboard', '-o'], write: ['xclip', '-selection', 'clipboard'] },
  windows : { read: ['powershell', '-NoProfile', '-Command', 'Get-Clipboard -Raw'], write: ['powershell', '-NoProfile', '-Command', '$input | Set-Clipboard'] },
};

const clipboard = {
  read  : async () => (await run(toolOf(CLIPBOARD, 'clipboard').read)).replace(/\r?\n$/, ''),
  write : async text => { await run(toolOf(CLIPBOARD, 'clipboard').write, { input: String(text) }); },
};

// :::::: DIALOGS, a folder: its path, null when cancelled

const FOLDER = {
  darwin  : ['osascript', '-e', 'POSIX path of (choose folder)'],
  linux   : ['zenity', '--file-selection', '--directory'],
  windows : ['powershell', '-NoProfile', '-Command', "Add-Type -AssemblyName System.Windows.Forms; $dialog = New-Object System.Windows.Forms.FolderBrowserDialog; if ($dialog.ShowDialog() -eq 'OK') { $dialog.SelectedPath }"],
};

const dialogs = {
  async folder () {
    const { code, stdout } = await spawn(toolOf(FOLDER, 'dialogs'));
    const path = stdout.trim().replaceAll('\\', '/').replace(/(.)\/$/, '$1');
    return code === 0 && path ? path : null;
  },
};

// :::::: EXTERNAL

const OPEN = {
  darwin  : url => ['open', url],
  linux   : url => ['xdg-open', url],
  windows : url => ['rundll32', 'url.dll,FileProtocolHandler', url],
};

const external = {
  open : async url => { await run(toolOf(OPEN, 'external')(String(url))); },
};

// :::::: FS, the operations of drivers/_fs.js. bytes cross as base64

const fs = {
  async list (path) {
    const entries = [];
    for await (const entry of Deno.readDir(path)) entries.push({ kind: entry.isDirectory ? 'directory' : 'file', name: entry.name });
    return entries;
  },

  mkdir  : path => Deno.mkdir(path, { recursive: true }),
  read   : async path => toBase64(await Deno.readFile(path)),
  remove : (path, recursive = false) => Deno.remove(path, { recursive }),
  write  : (path, data) => Deno.writeFile(path, fromBase64(data)),

  async stat (path) {
    try   { const info = await Deno.stat(path); return { kind: info.isDirectory ? 'directory' : 'file', modified: info.mtime?.getTime() ?? 0, size: info.size }; }
    catch (error) { if (error instanceof Deno.errors.NotFound) return null; throw error; }
  },
};

// :::::: NOTIFICATIONS, title and body through the environment: nothing to quote

const NOTIFY = {
  darwin  : ['osascript', '-e', 'display notification (system attribute "RAT_BODY") with title (system attribute "RAT_TITLE")'],
  linux   : ['sh', '-c', 'notify-send "$RAT_TITLE" "$RAT_BODY"'],
  windows : ['powershell', '-NoProfile', '-Command', 'Add-Type -AssemblyName System.Windows.Forms; $icon = New-Object System.Windows.Forms.NotifyIcon; $icon.Icon = [System.Drawing.SystemIcons]::Information; $icon.Visible = $true; $icon.ShowBalloonTip(5000, $env:RAT_TITLE, $env:RAT_BODY, "None"); Start-Sleep -Seconds 6; $icon.Dispose()'],
};

const notifications = {
  // windows keeps its icon a few seconds: not waited for
  show (title, body = '') {
    const done = run(toolOf(NOTIFY, 'notifications'), { env: { RAT_BODY: String(body), RAT_TITLE: String(title) } });
    if (OS !== 'windows') return done.then(() => {});
    done.catch(error => console.error(error));
  },
};

// :::::: SQLITE, a database file per name in the data folder

function sqliteOf (data) {
  const databases = new Map;
  const open = name => {
    if (!databases.has(name)) databases.set(name, new DatabaseSync(`${data}/${name}.sqlite`));
    return databases.get(name);
  };
  return {
    query : (name, sql, values = []) => open(name).prepare(sql).all(...values),
    run   : (name, sql, values = []) => { open(name).prepare(sql).run(...values); },
  };
}

// :::::: HOST

function host (win, { data, name = 'rat' } = {}) {
  data ??= dataOf(name);
  Deno.mkdirSync(data, { recursive: true });

  const sqlite = sqliteOf(data);

  const BINDINGS = {
    'rat:clipboard.read'      : () => clipboard.read(),
    'rat:clipboard.write'     : text => clipboard.write(text),
    'rat:dialogs.folder'      : () => dialogs.folder(),
    'rat:external.open'       : url => external.open(url),
    'rat:fs.data'             : () => data,
    'rat:fs.list'             : path => fs.list(path),
    'rat:fs.mkdir'            : path => fs.mkdir(path),
    'rat:fs.read'             : path => fs.read(path),
    'rat:fs.remove'           : (path, recursive) => fs.remove(path, recursive),
    'rat:fs.stat'             : path => fs.stat(path),
    'rat:fs.write'            : (path, data) => fs.write(path, data),
    'rat:notifications.show'  : (title, body) => notifications.show(title, body),
    'rat:sqlite.query'        : (name, sql, values) => sqlite.query(name, sql, values),
    'rat:sqlite.run'          : (name, sql, values) => sqlite.run(name, sql, values),
  };

  for (const [binding, fn] of Object.entries(BINDINGS)) win.bind(binding, fn);
  return win;
}

// :::::: EXPORT

export { clipboard, dialogs, external, fs, host, notifications };
export default host;
