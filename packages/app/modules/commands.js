// @rat/app :: commands
// the new form, a draft: not wired in yet, @rat/commands is still the one in use

/*
commands are the vocabulary of an app, the things it can do. ui, hotkeys and code
fire them by name instead of importing each handler, so a button and a shortcut
share one behaviour.

the registry is a $Dict: one key per command in kebab-case, whatever spelling it
was set or asked with, and an entry with the function and what a ui shows of it.
a palette or a settings page that lists the commands follows it by itself.

  const commands = createCommands({
    save       : () => …,                                    // a function is { exec }
    togglePlay : { exec: () => …, title: 'Play / pause', description: 'starts or stops the episode' },
  });

  commands.set('open-settings', () => …);
  commands.openSettings = () => …;          // the same
  commands.assign({ save, … });             // several at once
  commands.delete('save');

  commands.get('toggle_play');              // { description, exec, title }
  commands.has('Toggle Play');              // true
  [...commands.keys()];                     // ['toggle-play', 'open-settings']

  commands.run('toggle-play', event);       // exec(event)
  commands.run('go[settings]');             // exec('settings')
  commands.togglePlay(event);               // exec(event)
  const stop = commands.listen(root);       // runs the 'rat:command' events that reach root

in markup a string handler is a command (onclick='save'): commandListener(text)
fires a bubbling 'rat:command' with { args, event, name }. a registry listening
on an ancestor runs it and stops it there, so a nested registry (a component's)
wins over an outer one (the app's).

arguments go in brackets: onclick='move[up, 3]' is move('up', 3, event). numbers,
true, false and null are read as such, anything else is a string. a name with :
is an event, not a command: onclick='rat:toggle[menu]' fires 'rat:toggle'.

an error of a command, thrown or a rejected promise, reaches the nearest error
boundary as 'rat:error' from the element the command came from.
*/

import { $Dict, Fn, KebabCase, Str } from '@rat/types';

const COMMAND  = 'rat:command';
const LITERALS = { false: false, null: null, true: true };
const METHODS  = new Set(['assign', 'clear', 'delete', 'entries', 'get', 'has', 'keys', 'listen', 'run', 'set', 'size', 'values']);

// ::: the schema

const Command  = { '?description': Str, exec: Fn, '?title': Str };
const Commands = $Dict(Str.to(KebabCase), Command);

// a function is the shortest entry
const entryOf = command => typeof command === 'function' ? { exec: command } : command;

// ::: parsing

const argumentOf = text => text in LITERALS ? LITERALS[text] : /^-?\d+(\.\d+)?$/.test(text) ? Number(text) : text;

const parsed = new Map;

// 'move[up, 3]' -> { args: ['up', 3], name: 'move' }
function parseCommand (text) {
  if (!parsed.has(text)) {
    const [, name = text, list] = /^([^[\]]+)\[(.*)\]$/.exec(String(text).trim()) ?? [];
    parsed.set(text, { args: list === undefined || list.trim() === '' ? [] : list.split(',').map(part => argumentOf(part.trim())), name: name.trim() });
  }
  return parsed.get(text);
}

// ::: firing

// a 'rat:command' from target, bubbling and through shadow roots. a name with : is an event of its own
function command (target, text, event = null, args = []) {
  const { args: written, name } = parseCommand(text);
  const type = name.includes(':') ? name : COMMAND;
  return target.dispatchEvent(new CustomEvent(type, { bubbles: true, cancelable: true, composed: true, detail: { args: [...written, ...args], event, name } }));
}

// the handler a compiled onclick='save' or onclick='go[settings]' gets
const commandListener = text => event => command(event.currentTarget, text, event);

// up as 'rat:error' from where the command was fired, else reportError
function raise (node, error) {
  const event = new CustomEvent('rat:error', { bubbles: true, cancelable: true, composed: true, detail: { boundary: null, error } });
  if (!node?.isConnected || node.dispatchEvent(event)) (globalThis.reportError ?? console.error)(error);
}

// ::: the registry

function createCommands (entries = {}) {
  const dict = Commands.create();

  const api = {
    assign (entries) { for (const [name, command] of Object.entries(entries)) dict.set(name, entryOf(command)); return proxy; },
    clear  ()        { dict.clear(); return proxy; },
    delete (name)    { return dict.delete(name); },
    set    (name, command) { dict.set(name, entryOf(command)); return proxy; },

    entries () { return dict.entries(); },
    get  (name) { return dict.get(name); },
    has  (name) { return dict.has(name); },
    keys ()     { return dict.keys(); },
    get size () { return dict.size; },
    values ()   { return dict.values(); },

    // run('save'), run('go', 'settings'), run('go[settings]')
    run (text, ...args) {
      const { args: written, name } = parseCommand(text);
      return dict.get(name)?.exec(...written, ...args);
    },

    // runs the commands fired below root that this registry knows, and stops them there
    listen (root = document) {
      const handle = event => {
        const { args = [], event: origin, name: text } = event.detail ?? {};
        const { args: written, name } = parseCommand(text);
        const entry = dict.get(name);
        if (!entry) return;
        event.stopPropagation();
        const from = event.composedPath()[0];
        try {
          const result = entry.exec(...written, ...args, origin);
          if (typeof result?.catch === 'function') result.catch(error => raise(from, error));
        }
        catch (error) { raise(from, error); }
      };
      root.addEventListener(COMMAND, handle);
      return () => root.removeEventListener(COMMAND, handle);
    },
  };

  // any other key is a command: reading gives its exec, writing sets it
  const proxy = new Proxy(api, {
    deleteProperty (target, key)        { return dict.delete(key); },
    get            (target, key)        { return typeof key !== 'string' || METHODS.has(key) ? Reflect.get(target, key) : dict.get(key)?.exec; },
    has            (target, key)        { return METHODS.has(key) || dict.has(key); },
    ownKeys        ()                   { return [...dict.keys()]; },
    set            (target, key, value) { if (METHODS.has(key)) return false; dict.set(key, entryOf(value)); return true; },

    getOwnPropertyDescriptor (target, key) {
      return dict.has(key) ? { configurable: true, enumerable: true, value: dict.get(key).exec, writable: true } : undefined;
    },
  });

  return api.assign(entries);
}

// :::::: EXPORT

export { COMMAND, Command, Commands, command, commandListener, createCommands, parseCommand };
