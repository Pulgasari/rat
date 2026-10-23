// @rat/commands

import { Fn, Str, Table } from '@rat/types';

class CommandsManager {
  #register = new Table ({ key: Str, exec: Fn });
}

// oder so ?

const CommandsRegistry = Table ({ key: Str, exec: Fn });

class CommandsManager {
  #register = new CommandsRegistry;
}

class CommandsListener {}



// @rat/commands

import { $Map } from '@rat/types';

// one name in any spelling: 'toggle-play', 'togglePlay', 'toggle_play', 'Toggle Play' -> 'toggle-play'
const keyOf = name => …;

class Commands {
  #map = new $Map;   // key -> fn, reactive: a ui (palette, settings) follows it

  // write
  set    (name, fn) {}   // fn must be a function
  assign (entries)  {}   // { name: fn, … }
  delete (name)     {}
  clear  ()         {}

  // read
  get  (name) {}         // fn | undefined
  has  (name) {}
  keys ()     {}         // the keys, for a list in a ui

  // run
  run (name, ...args) {} // fn(...args)
}

const createCommands = entries => new Commands().assign(entries);


const Commands = $MapDing ({ 
  key   : Union (CamelCase, KebabCase, SnakeCase),
  entry : Record({ exec: Fn, '?title': Str, '?description': Str })
});

KebabCase.is('toggle-play');              // true
KebabCase.is('togglePlay');               // false: alone it only checks
KebabCase.parse('togglePlay');            // TypeError: kebab-case
KebabCase.from('togglePlay');             // 'toggle-play'

Str.to(KebabCase).parse('togglePlay');    // 'toggle-play': made with from(), then checked
Str.to(KebabCase).parse(42);              // TypeError: a string. Str checks first

// KebabCase checks: only kebab passes. its from(…) makes it out of any spelling
const KebabCase = Str.pattern(/^[a-z0-9]+(-[a-z0-9]+)*$/).from(text => …);

KebabCase.from('togglePlay');   // 'toggle-play'
KebabCase.is('togglePlay');     // false: on its own it only checks

Str.to(KebabCase)               // a Str turned into KebabCase: from(), then checked by KebabCase


class Schema {
  // … what is there: check, default, optional, validate, parse, is …

  // how this schema is made out of another value: KebabCase.from(text) -> 'toggle-play'.
  // set with a function, called with a value
  from (value) {
    if (typeof value === 'function') return this.derive({ make: value });
    if (!this.make) throw new TypeError(`[rat] ${this.kind} can not be made from a value`);
    return this.make(value);
  }

  // this schema's check first, then target made from what passed, then target's checks
  to (target) {
    return this.derive({ run: (value, path) => {
      const result = this.validate(value, path);
      return result.issues ? result : target.validate(target.from(result.value), path);
    } });
  }
}

// camelCase: starts lowercase, subsequent words capitalized (e.g. "camelCase", "myVar123")

// PascalCase: every word starts with an uppercase letter (e.g. "PascalCase", "MyClass123")

// CONSTANT_CASE: all uppercase with underscore delimiters (e.g. "CONSTANT_CASE", "MAX_RETRY_COUNT")

// snake_case: all lowercase with underscore delimiters (e.g. "snake_case", "user_id_123")

// Title Case: capitalized words separated by spaces (e.g. "Title Case", "Hello World 123")


capitalize     = value => { const s = String(value ?? ''); return s.charAt(0).toUpperCase() + s.slice(1); },
toLowerCase    = 
toUpperCase    = 
toCamelCase    = value => 
toConstantCase = 
toKebabCase    = 
toPascalCase   = 
toSlugCase     = value => slugify(value),
toSnakeCase    = 
toTitleCase    = 

// lowercase: all lowercase letters and numbers (e.g. "lowercase", "hello123")

// UPPERCASE: all uppercase letters and numbers (e.g. "UPPERCASE", "HELLO123")

// Mocking Case (strict alternating): starts with lowercase or uppercase, then alternates (e.g. "mOcKiNgCaSe", "MoCkInG")




// ::: Helpers

const toWords = (value) => String(value ?? '')
  .replace(/([a-z\d])([A-Z])/g, '$1 $2')
  .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
  .replace(/[\s\-_.]+/g, ' ')
  .trim()
  .toLowerCase()
  .split(' ')
  .filter(Boolean);

const upperFirst = (word) => word.charAt(0).toUpperCase() + word.slice(1);

// ::: Case Schemas/Codecs

const CamelCase = {
  pattern   : /^[a-z][a-z0-9]*([A-Z][a-z0-9]*)*$/,
  transform : value => toWords(value).map((word, index) => index ? upperFirst(word) : word).join(''),
}

const ConstantCase = {
  pattern   : /^[A-Z0-9]+(_[A-Z0-9]+)*$/,
  transform : value => toWords(value).join('_').toUpperCase(),
}

const KebabCase = {
  pattern   : /^[a-z0-9]+(-[a-z0-9]+)*$/,
  transform : value => toWords(value).join('-'),
}

const LowerCase = {
  pattern   : /^[a-z0-9]+$/,
  transform : value => String(value ?? '').toLowerCase(),q
}

const MockingCase = {
  pattern   : /^(?:(?:[a-z][A-Z])*[a-z]?|(?:[A-Z][a-z])*[A-Z]?)$/,
  transform : value => value, // ???
}

const PascalCase = {
  pattern   : /^[A-Z][a-z0-9]*([A-Z][a-z0-9]*)*$/,
  transform : value => toWords(value).map(upperFirst).join(''),
}

const SnakeCase = {
  pattern   : /^[a-z0-9]+(_[a-z0-9]+)*$/,
  transform : value => toWords(value).join('_'),
}

const TitleCase = {
  pattern   : /^[A-Z][a-z0-9]*(\s[A-Z][a-z0-9]*)*$/,
  transform : value => toWords(value).map(upperFirst).join(' '),
}

const UpperCase = {
  pattern   : /^[A-Z0-9]+$/,
  transform : value => String(value ?? '').toUpperCase(),
}




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
