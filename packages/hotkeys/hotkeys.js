// @rat/hotkeys :: hotkeys

/*
app-wide shortcuts, declared as a map of combo -> what it does:

  const hotkeys = createHotkeys({ commands });

  hotkeys.assign({
    'ctrl+s'     : 'save',                                    // a command name
    'escape'     : () => close(),                             // a function
    'space'      : { command: 'toggle-play', when: hasPlayer },
    'ctrl+k|/'   : { command: 'search', global: true },
  });

  hotkeys.set('ctrl+s', 'save');     // one
  hotkeys['ctrl+s'] = 'save';        // the same, property form (hotkeys['ctrl+s'] reads it back)
  delete hotkeys['ctrl+s'];          // remove('ctrl+s')

a name runs through the commands given, without them it fires 'rat:command'
from the focused element, so a registry listening above it runs it. define is
assign under its older name. plain
typing in an input, textarea, select or contenteditable is left alone, unless
the combo holds ctrl, alt or meta or the binding says global. preventDefault
is on unless the binding sets it to false. when gates a binding.
*/

import { keyName, matchesCombo, parseCombos } from './keys.js';

const isEditable = element => !!element && (/^(INPUT|SELECT|TEXTAREA)$/.test(element.tagName) || element.isContentEditable);

const specOf = value => typeof value === 'string' || typeof value === 'function' ? { command: value } : { ...value, command: value.command ?? value.action };

const fire = name => event => (event.composedPath?.()[0] ?? document.activeElement ?? document).dispatchEvent(new CustomEvent('rat:command', { bubbles: true, composed: true, detail: { event, name } }));

const RESERVED = new Set(['assign', 'define', 'destroy', 'get', 'list', 'remove', 'set']);

function createHotkeys ({ commands = null, target = globalThis } = {}) {
  const byKey = new Map; // the last key of a combo -> [{ combo, keys, spec }]

  const runnerOf = command => typeof command === 'function' ? command
    : typeof command !== 'string' ? null
    : commands ? event => commands.run(command, event)
    : fire(command);

  // a key someone else used up (an overlay that closed on escape) is no shortcut
  const onKeydown = event => {
    if (event.defaultPrevented) return;
    for (const { combo, spec } of byKey.get(keyName(event.key)) ?? []) {
      if (!matchesCombo(event, combo)) continue;
      if (!spec.global && !(event.ctrlKey || event.metaKey || event.altKey) && isEditable(event.composedPath?.()[0] ?? event.target)) return;
      if (spec.when && !spec.when(event)) continue;
      const run = runnerOf(spec.command);
      if (!run) return;
      if (spec.preventDefault !== false) event.preventDefault();
      run(event);
      return;
    }
  };

  target.addEventListener('keydown', onKeydown);

  const api = {
    // { 'ctrl+s': 'save' | fn | { command, when, global, preventDefault }, … }
    assign (map = {}) {
      for (const [keys, value] of Object.entries(map)) api.set(keys, value);
      return proxy;
    },

    define (map) { return api.assign(map); },

    destroy () { target.removeEventListener('keydown', onKeydown); byKey.clear(); },

    // the binding of a combo as it was given, undefined without one
    get (keys) {
      const spelled = normalize(keys);
      return [...byKey.values()].flat().find(binding => binding.keys === spelled)?.spec.given;
    },

    list () { return [...new Set([...byKey.values()].flat().map(binding => binding.keys))]; },

    set (keys, value) {
      api.remove(keys);
      const spec = { ...specOf(value), given: value };
      for (const combo of parseCombos(keys)) {
        const last = combo[combo.length - 1];
        byKey.set(last, [...(byKey.get(last) ?? []), { combo, keys: normalize(keys), spec }]);
      }
      return proxy;
    },

    remove (...keys) {
      const gone = new Set(keys.flat().map(normalize));
      for (const [key, bindings] of byKey) {
        const kept = bindings.filter(binding => !gone.has(binding.keys));
        if (kept.length) byKey.set(key, kept);
        else byKey.delete(key);
      }
      return proxy;
    },
  };

  // any other key is a combo: get reads its binding, set binds it, delete removes it
  const proxy = new Proxy(api, {
    deleteProperty (target, key)        { api.remove(key); return true; },
    get            (target, key)        { return typeof key !== 'string' || RESERVED.has(key) ? target[key] : api.get(key); },
    set            (target, key, value) { if (RESERVED.has(key)) return false; api.set(key, value); return true; },
  });

  return proxy;
}

// one spelling per binding, for remove() and list(): 'Ctrl + S' -> 'ctrl+s'
const normalize = keys => parseCombos(keys).map(combo => combo.join('+')).join('|');

// :::::: EXPORT

export { createHotkeys };
