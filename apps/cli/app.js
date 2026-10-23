// cli/app.js
// a terminal over the origin's opfs. the commands that need real work go to a
// worker, the rest run here.

// :::::: IMPORTS :::::::::::::::::::::::::::::::::::::::::::

import * as fit   from '@xterm/addon-fit';
import * as xterm from '@xterm/xterm';

import { signal }            from '@aufbau/signals';
import { useEffect, useRef } from '/.shared/js/vendors.js';

import { vfs } from '/.shared/js/modules/opfs.js';

import { terminalOptions } from './app.config.js';

// esm.sh hands these umd builds out with named exports, a vendored copy as one default object
const { FitAddon } = fit.FitAddon   ? fit   : fit.default;
const { Terminal } = xterm.Terminal ? xterm : xterm.default;

// :::::: STATE :::::::::::::::::::::::::::::::::::::::::::::

const app = zugriff.app;

const { Config } = await zugriff.components('Config');

const VERSION = 'v0.2.0';

// the commands the prompt knows, the wasm tools join with `init`
const loadedCommands = signal(new Set(['help', 'init', 'clear', 'ls', 'upload', 'download', 'rm']));

const rootRef = { current: null };
const area    = name => rootRef.current?.area(name);

// :::::: TERMINAL ::::::::::::::::::::::::::::::::::::::::::

function TerminalView () {
  const terminalRef = useRef(null);

  useEffect(() => {
    if (!terminalRef.current) return;

    const term     = new Terminal(terminalOptions());
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(terminalRef.current);
    fitAddon.fit();

    // the worker sits next to this module, not next to the page
    const worker = new Worker(new URL('./worker.js', import.meta.url), { type: 'module' });

    const prompt = 'zugriff> ';
    let currentLine = '';
    let isExecuting = false;

    const writePrompt = () => {
      isExecuting = false;
      term.write(`\r\n\x1b[32m${prompt}\x1b[0m`);
    };

    worker.onmessage = event => {
      const { type, text } = event.data;
      if (type === 'STDOUT') term.writeln(`\x1b[36m${text}\x1b[0m`);
      if (type === 'STDERR') term.writeln(`\x1b[31m${text}\x1b[0m`);
      if (type === 'EXIT')   writePrompt();
    };

    // the area resizes with the window and when a dock opens beside it
    const observer = new ResizeObserver(() => fitAddon.fit());
    observer.observe(terminalRef.current);

    term.writeln(`\x1b[1;34m=== zugriff ${VERSION} ===\x1b[0m`);
    term.writeln('Client-side WASM micro-terminal. Type "help" to list available commands.');
    term.write(`\x1b[32m${prompt}\x1b[0m`);

    term.onData(async data => {
      if (isExecuting) return;
      const charCode = data.charCodeAt(0);

      if (charCode === 13) {   // enter
        term.write('\r\n');
        const input = currentLine.trim();
        currentLine = '';
        if (!input) return writePrompt();
        isExecuting = true;
        await handleCommand(input, term, worker, writePrompt);
      }
      else if (charCode === 127) {   // backspace
        if (!currentLine.length) return;
        currentLine = currentLine.slice(0, -1);
        term.write('\b \b');
      }
      else if (charCode >= 32) {
        currentLine += data;
        term.write(data);
      }
    });

    return () => {
      observer.disconnect();
      worker.terminate();
      term.dispose();
    };
  }, []);

  return html`<div class="terminal-container" ref=${terminalRef}></div>`;
}

// :::::: APP :::::::::::::::::::::::::::::::::::::::::::::::

function App () {
  const root = useRef(null);

  useEffect(() => { rootRef.current = root.current; }, []);

  return html`
    <app-root ref=${root} routing='none'>
      <app-area name='main'>
        <header id="app-head">
          <div id="app-logo">
            <h1>zugriff</h1>
            <span class="version">${VERSION}</span>
          </div>
          <button class="ghost-btn" title="Settings" onClick=${() => area('config')?.toggle()}>
            <svg-icon icon="settings" />
          </button>
        </header>

        <main id="app-main">
          <${TerminalView} />
        </main>

        <footer id="app-foot">
          <span>Engine: OPFS + WebWorker</span>
          <span>Loaded Tools: ${loadedCommands.value.size}</span>
        </footer>
      </app-area>

      <app-area name='config' dock='end'><${Config} /></app-area>
    </app-root>
  `;
}

// :::::: COMMANDS ::::::::::::::::::::::::::::::::::::::::::

// Dispatch commands to built-in handlers or Web Worker
async function handleCommand(rawInput, term, worker, finishCallback) {
  const [cmd, ...args] = rawInput.split(/\s+/);

  switch (cmd) {
    case 'help':
      term.writeln('Available commands:');
      term.writeln('  ls           - List files in virtual filesystem (OPFS)');
      term.writeln('  upload       - Open file dialog to upload file into OPFS');
      term.writeln('  download <f> - Download file from OPFS to host system');
      term.writeln('  rm <f>       - Delete file from OPFS');
      term.writeln('  init <tool>  - Register WASM executable tool');
      term.writeln('  clear        - Clear terminal screen');
      finishCallback();
      break;

    case 'clear':
      term.clear();
      finishCallback();
      break;

    case 'ls':
      try {
        const files = await vfs.listFiles();
        if (files.length === 0) {
          term.writeln('VFS is empty.');
        } else {
          files.forEach(f => term.writeln(`${f.name.padEnd(25)}${f.size} bytes`));
        }
      } catch (err) {
        term.writeln(`\x1b[31mError accessing VFS: ${err.message}\x1b[0m`);
      }
      finishCallback();
      break;

    case 'upload':
      triggerFileUpload(term, finishCallback);
      break;

    case 'download':
      if (!args[0]) {
        term.writeln('\x1b[31mError: Filename required. Usage: download <filename>\x1b[0m');
        finishCallback();
        break;
      }
      await triggerFileDownload(args[0], term);
      finishCallback();
      break;

    case 'rm':
      if (!args[0]) {
        term.writeln('\x1b[31mError: Filename required. Usage: rm <filename>\x1b[0m');
        finishCallback();
        break;
      }
      try {
        await vfs.removeFile(args[0]);
        term.writeln(`Removed file: ${args[0]}`);
      } catch (err) {
        term.writeln(`\x1b[31mError removing file: ${err.message}\x1b[0m`);
      }
      finishCallback();
      break;

    case 'init':
      if (!args[0]) {
        term.writeln('\x1b[31mError: Tool name required. Usage: init <tool>\x1b[0m');
        finishCallback();
        break;
      }
      const tool = args[0];
      loadedCommands.value = new Set([...loadedCommands.value, tool]);
      term.writeln(`\x1b[32mRegistered WASM executable: ${tool}\x1b[0m`);
      finishCallback();
      break;

    default:
      if (loadedCommands.value.has(cmd)) {
        // Delegate CPU work to Web Worker
        worker.postMessage({ type: 'RUN_COMMAND', payload: { cmd, args } });
      } else {
        term.writeln(`\x1b[31mCommand not found: ${cmd}. Type "help" for instructions.\x1b[0m`);
        finishCallback();
      }
      break;
  }
}

// Helper: Programmatic file upload to OPFS
function triggerFileUpload(term, callback) {
  const input = document.createElement('input');
  input.type = 'file';

  // 1. User selects a file
  input.onchange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      term.writeln(`Uploading ${file.name} to VFS...`);
      const buffer = await file.arrayBuffer();
      await vfs.writeFile(file.name, buffer);
      term.writeln(`\x1b[32mSuccessfully saved ${file.name} to OPFS.\x1b[0m`);
    } else {
      term.writeln('Upload canceled.');
    }
    callback();
  };

  // 2. User cancels/closes the file dialog window
  input.oncancel = () => {
    term.writeln('Upload canceled.');
    callback();
  };

  input.click();
}


// Helper: Download file from OPFS
async function triggerFileDownload(filename, term) {
  try {
    const buffer = await vfs.readFile(filename);
    const blob = new Blob([buffer]);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    term.writeln(`Triggered download for: ${filename}`);
  } catch (err) {
    term.writeln(`\x1b[31mDownload failed: ${err.message}\x1b[0m`);
  }
}

// :::::: BOOT ::::::::::::::::::::::::::::::::::::::::::::::

app.init({ App });
