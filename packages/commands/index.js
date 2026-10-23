// @rat/commands

/*
commands are the vocabulary of an app, the things it can do: save, openSettings,
togglePlay. ui, hotkeys and code fire them by name instead of importing each
handler, so a button and a shortcut share one behaviour.

  const commands = createCommands({ save, openSettings });

  commands.add('toggle-play', () => …);   // register
  commands.set('toggle-play', () => …);   // the same
  commands['toggle-play'] = () => …;      // the same, property form
  commands.assign({ save, 'toggle-play': () => … });   // several at once
  commands.run('toggle-play', event);     // fire
  commands.togglePlay(event);             // the same, property form
  const stop = commands.listen(root);     // runs the 'rat:command' events that reach root

names are one across kebab, camel and snake case: 'toggle-play', 'togglePlay'
and 'toggle_play' are the same command.

in markup a string handler is a command (onclick='save'): commandListener(name)
fires a bubbling 'rat:command' with { args, event, name }. a registry listening
on an ancestor runs it and stops it there, so a nested registry (a component's)
wins over an outer one (the app's).

arguments go in brackets, like the key modifiers (d-16):

  onclick='go[settings]'     go('settings', event)
  onclick='move[up, 3]'      move('up', 3, event)

numbers, true, false and null are read as such, anything else is a string. the
handler gets the arguments, then the event that fired it.

a name with : is an event, not a command: onclick='rat:toggle[menu]' fires
'rat:toggle' with the same detail, for whoever listens to it (<rat-app> does).

an error of a handler, thrown or a rejected promise, reaches the nearest error
boundary as 'rat:error' from the element the command came from.
*/

const COMMAND  = 'rat:command';
const RESERVED = new Set(['add', 'assign', 'get', 'has', 'list', 'listen', 'remove', 'run', 'set']);
const LITERALS = { false: false, null: null, true: true }; // 'move[up, 3]' -> { name: 'move', args: ['up', 3] }

const argumentOf = text => text in LITERALS ? LITERALS[text] : /^-?\d+(\.\d+)?$/.test(text) ? Number(text) : text;

const parsed = new Map;

function parseCommand (text) {
  if (!parsed.has(text)) {
    const [, name = text, list] = /^([^[\]]+)\[(.*)\]$/.exec(String(text).trim()) ?? [];
    parsed.set(text, { args: list === undefined || list.trim() === '' ? [] : list.split(',').map(part => argumentOf(part.trim())), name: name.trim() });
  }
  return parsed.get(text);
}

// 'toggle-play', 'toggle_play', 'togglePlay' -> 'togglePlay'
const nameOf = id => String(id).replace(/[-_\s]+([a-z0-9])/gi, (_, char) => char.toUpperCase()).replace(/^[A-Z]/, char => char.toLowerCase());

// ::: firing

// a 'rat:command' from target, bubbling and through shadow roots. 'go[settings]' brings its arguments.
// a name with : is an event of its own instead: 'rat:toggle[menu]' fires 'rat:toggle', no registry needed
function command (target, text, event = null, args = []) {
  const { args: written, name } = parseCommand(text);
  const type = name.includes(':') ? name : COMMAND;
  return target.dispatchEvent(new CustomEvent(type, { bubbles: true, cancelable: true, composed: true, detail: { args: [...written, ...args], event, name } }));
}

// the handler a compiled onclick='save' or onclick='go[settings]' gets
const commandListener = text => event => command(event.currentTarget, text, event);

// an error of a handler goes up as 'rat:error' from where the command was fired, to the nearest
// error boundary. the same as raise() of @rat/runtime, which this package can not import (it imports this one)
function raise (node, error) {
  const event = new CustomEvent('rat:error', { bubbles: true, cancelable: true, composed: true, detail: { boundary: null, error } });
  if (!node?.isConnected || node.dispatchEvent(event)) (globalThis.reportError ?? console.error)(error);
}

// ::: the registry

function createCommands (source = {}) {
  const map = new Map;

  const api = {
    add    (id, fn)  { map.set(nameOf(id), fn); return proxy; },
    assign (entries) { for (const [id, fn] of Object.entries(entries)) map.set(nameOf(id), fn); return proxy; },
    get    (id)      { return map.get(nameOf(id)); },
    has (id)     { return map.has(nameOf(id)); },
    list ()      { return [...map.keys()]; },

    // runs the commands fired below root that this registry knows, and stops them there
    listen (root = document) {
      // the name may carry its arguments still ('go[settings]' from a hotkey without a registry)
      const handle = event => {
        const { args = [], event: origin, name: text } = event.detail ?? {};
        const { args: written, name } = parseCommand(text);
        if (!map.has(nameOf(name))) return;
        event.stopPropagation();
        const from = event.composedPath()[0];
        try {
          const result = map.get(nameOf(name))(...written, ...args, origin);
          if (typeof result?.catch === 'function') result.catch(error => raise(from, error));
        }
        catch (error) { raise(from, error); }
      };
      root.addEventListener(COMMAND, handle);
      return () => root.removeEventListener(COMMAND, handle);
    },

    remove (id)       { map.delete(nameOf(id)); return proxy; },
    set    (id, fn)   { map.set(nameOf(id), fn); return proxy; },
    // run('save'), run('go', 'settings'), run('go[settings]')
    run (id, ...args) {
      const { args: written, name } = parseCommand(id);
      return map.get(nameOf(name))?.(...written, ...args);
    },
  };

  // any other key is a command: get returns it, set registers it
  const proxy = new Proxy (api, {
    deleteProperty           (target, key)        { return map.delete(nameOf(key)); },
    get                      (target, key)        { return typeof key !== 'string' || RESERVED.has(key) ? target[key] : map.get(nameOf(key)); },
    getOwnPropertyDescriptor (target, key)        { return map.has(nameOf(key)) ? { configurable: true, enumerable: true, value: map.get(nameOf(key)), writable: true } : undefined; },
    has                      (target, key)        { return RESERVED.has(key) || map.has(nameOf(key)); },
    ownKeys                  ()                   { return [...map.keys()]; },
    set                      (target, key, value) { if (RESERVED.has(key)) return false; map.set(nameOf(key), value); return true; },
  });

  return api.assign(source);
}

// :::::: EXPORT

export { COMMAND, command, commandListener, createCommands, nameOf, parseCommand };
