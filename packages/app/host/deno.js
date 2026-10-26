// @rat/app :: host :: deno

/*
the deno side of rat's drivers in a Deno Desktop app: a binding per call, under rat: so they do not mix
with the app's own. the app's deno entrypoint hands its window over:

  import { host } from '@rat/app/host/deno.js';
  host(win);                                   // the window deno desktop gives it
  win.bind('scanLibrary', path => …);          // the app's own: bindings.scanLibrary(path) in the page

runs in deno, not in the page.
*/

// :::::: CLIPBOARD
// deno has no clipboard of its own: the system's tools. linux takes wayland's, else x11's

const CLIPBOARD = {
  darwin  : { read: ['pbpaste'], write: ['pbcopy'] },
  linux   : Deno.env.get('WAYLAND_DISPLAY') ? { read: ['wl-paste', '--no-newline'], write: ['wl-copy'] } : { read: ['xclip', '-selection', 'clipboard', '-o'], write: ['xclip', '-selection', 'clipboard'] },
  windows : { read: ['powershell', '-NoProfile', '-Command', 'Get-Clipboard -Raw'], write: ['powershell', '-NoProfile', '-Command', '$input | Set-Clipboard'] },
};

async function run ([command, ...args], input) {
  let child;
  try { child = new Deno.Command(command, { args, stdin: input == null ? 'null' : 'piped', stdout: 'piped', stderr: 'piped' }).spawn(); }
  catch (error) {
    if (error instanceof Deno.errors.NotFound) throw new Error(`[rat] clipboard: ${command} is not installed`);
    throw error;
  }
  if (input != null) {
    const writer = child.stdin.getWriter();
    await writer.write(new TextEncoder().encode(input));
    await writer.close();
  }
  const { code, stderr, stdout } = await child.output();
  if (code !== 0) throw new Error(`[rat] ${command}: ${new TextDecoder().decode(stderr).trim() || `exit ${code}`}`);
  return new TextDecoder().decode(stdout);
}

const tools = () => CLIPBOARD[Deno.build.os] ?? Promise.reject(new Error(`[rat] clipboard: no tool on ${Deno.build.os}`));

const clipboard = {
  read  : async () => (await run((await tools()).read)).replace(/\r?\n$/, ''),
  write : async text => { await run((await tools()).write, String(text)); },
};

// :::::: HOST

function host (win) {
  win.bind('rat:clipboard.read',  () => clipboard.read());
  win.bind('rat:clipboard.write', text => clipboard.write(text));
  return win;
}

// :::::: EXPORT

export { clipboard, host };
export default host;
