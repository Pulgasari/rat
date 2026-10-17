// @rat/commands

/*
commands are the vocabulary of an app, the things it can do: save, openSettings,
togglePlay. ui, hotkeys and code fire them by name instead of importing each
handler, so a button and a shortcut share one behaviour.

  const commands = createCommands({ save, openSettings });

  commands.add('toggle-play', () => …);   // register
  commands.togglePlay = () => …;          // the same, property form
  commands.run('toggle-play', event);     // fire
  commands.togglePlay(event);             // the same, property form
  const stop = commands.listen(root);     // runs the 'rat:command' events that reach root

names are one across kebab, camel and snake case: 'toggle-play', 'togglePlay'
and 'toggle_play' are the same command.

in markup a string handler is a command (onclick='save'): commandListener(name)
fires a bubbling 'rat:command' with { event, name }. a registry listening on an
ancestor runs it and stops it there, so a nested registry (a component's) wins
over an outer one (the app's).
*/

const COMMAND  = 'rat:command';
const RESERVED = new Set(['add', 'get', 'has', 'list', 'listen', 'remove', 'run']);

// 'toggle-play', 'toggle_play', 'togglePlay' -> 'togglePlay'
const nameOf = id => String(id).replace(/[-_\s]+([a-z0-9])/gi, (_, char) => char.toUpperCase()).replace(/^[A-Z]/, char => char.toLowerCase());

// ::: firing

// a 'rat:command' from target, bubbling and through shadow roots
const command = (target, name, event = null) => target.dispatchEvent(new CustomEvent(COMMAND, { bubbles: true, composed: true, detail: { event, name } }));

// the handler a compiled onclick='save' gets
const commandListener = name => event => command(event.currentTarget, name, event);

// ::: the registry

function createCommands (source = {}) {
  const map = new Map;

  const api = {
    add (id, fn) { map.set(nameOf(id), fn); return proxy; },
    get (id)     { return map.get(nameOf(id)); },
    has (id)     { return map.has(nameOf(id)); },
    list ()      { return [...map.keys()]; },

    // runs the commands fired below root that this registry knows, and stops them there
    listen (root = document) {
      const handle = event => {
        const { event: origin, name } = event.detail ?? {};
        if (!map.has(nameOf(name))) return;
        event.stopPropagation();
        map.get(nameOf(name))(origin, event);
      };
      root.addEventListener(COMMAND, handle);
      return () => root.removeEventListener(COMMAND, handle);
    },

    remove (id)       { map.delete(nameOf(id)); return proxy; },
    run (id, ...args) { return map.get(nameOf(id))?.(...args); },
  };

  // any other key is a command: get returns it, set registers it
  const proxy = new Proxy(api, {
    deleteProperty (target, key)    { return map.delete(nameOf(key)); },
    get (target, key)               { return typeof key !== 'string' || RESERVED.has(key) ? target[key] : map.get(nameOf(key)); },
    getOwnPropertyDescriptor (target, key) { return map.has(nameOf(key)) ? { configurable: true, enumerable: true, value: map.get(nameOf(key)), writable: true } : undefined; },
    has (target, key)               { return RESERVED.has(key) || map.has(nameOf(key)); },
    ownKeys ()                      { return [...map.keys()]; },
    set (target, key, value)        { if (RESERVED.has(key)) return false; map.set(nameOf(key), value); return true; },
  });

  for (const [id, fn] of Object.entries(source)) map.set(nameOf(id), fn);
  return proxy;
}

// :::::: EXPORT

export { COMMAND, command, commandListener, createCommands, nameOf };
