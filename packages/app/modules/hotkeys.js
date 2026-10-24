// @rat/app :: hotkeys
// the new form beside commands.js. the default export is the mod: RAT.app.hotkeys (mods.js)

/*
shortcuts, a $Dict as commands.js: one key per combo ('ctrl+s', 'ctrl+k|/'),
however it was written ('Ctrl + S' is 'ctrl+s'), and an entry with what it runs
and when.

  const hotkeys = createHotkeys({ commands });   // without commands a key fires 'rat:command' (commands.js)

  hotkeys.assign({
    'ctrl+s'   : 'save',                          // a command key, with arguments too: 'go[settings]'
    'escape'   : () => close(),                   // a function, called with the event
    'space'    : { exec: 'toggle-play', when: hasPlayer, title: 'Play / pause' },
    'ctrl+k|/' : { exec: 'search', global: true },
  });

  hotkeys.set('ctrl+s', 'save');
  hotkeys['ctrl+s'] = 'save';                     // the same
  hotkeys['Ctrl + S'];                            // 'save': the exec
  hotkeys.get('ctrl+s');                          // { exec: 'save' }
  [...hotkeys.keys()];                            // ['ctrl+s', 'escape', 'space', 'ctrl+k|/']
  hotkeys.stop();                                 // no more keydown

plain typing in an input, textarea, select or contenteditable is left alone,
unless the combo holds ctrl, alt or meta or the entry says global. preventDefault
is on unless the entry sets it to false. when gates an entry. a key someone else
used up (event.defaultPrevented: an overlay that closed on escape) is no shortcut.
*/

import { matchesCombo, parseCombos }        from '@rat/hotkeys';
import { $Dict, Bool, Fn, Str, Union }      from '@rat/types';

import { command, keyed }                   from './commands.js';

// ::: the schema

// one spelling per combo: 'Ctrl + S|/' -> 'ctrl+s|/'
const normalize = keys => parseCombos(keys).map(combo => combo.join('+')).join('|');

const Combo   = Str.case({ transform: normalize });
const Hotkey  = { '?description': Str, exec: Union(Fn, Str), '?global': Bool, '?preventDefault': Bool, '?title': Str, '?when': Fn };
const Hotkeys = $Dict(Str.to(Combo), Hotkey);

// a function or a command key is the shortest entry
const entryOf = hotkey => typeof hotkey === 'function' || typeof hotkey === 'string' ? { exec: hotkey } : hotkey;

const isEditable = element => !!element && (/^(INPUT|SELECT|TEXTAREA)$/.test(element.tagName) || element.isContentEditable);

// ::: the registry

// commands: a registry that runs a command key, else it fires from from (the focused element without one).
// target: where keydown is listened to
function createHotkeys ({ commands = null, from = null, target = globalThis } = {}) {
  const dict   = Hotkeys.create();
  const combos = new Map;   // key -> parseCombos(key), once per key

  const combosOf = keys => {
    if (!combos.has(keys)) combos.set(keys, parseCombos(keys));
    return combos.get(keys);
  };

  const exec = (hotkey, event) => {
    if (typeof hotkey.exec === 'function') return hotkey.exec(event);
    if (commands) return commands.run(hotkey.exec, event);
    return command(from ?? event.composedPath?.()[0] ?? document.activeElement ?? document, hotkey.exec, event);
  };

  const onKeydown = event => {
    if (event.defaultPrevented) return;
    for (const [keys, hotkey] of dict) {
      if (!combosOf(keys).some(combo => matchesCombo(event, combo))) continue;
      if (!hotkey.global && !(event.ctrlKey || event.metaKey || event.altKey) && isEditable(event.composedPath?.()[0] ?? event.target)) return;
      if (hotkey.when && !hotkey.when(event)) continue;
      if (hotkey.preventDefault !== false) event.preventDefault();
      exec(hotkey, event);
      return;
    }
  };

  target.addEventListener('keydown', onKeydown);

  const own = {
    assign (entries) { for (const [keys, hotkey] of Object.entries(entries)) own.set(keys, hotkey); return proxy; },
    set    (keys, hotkey) { dict.set(keys, entryOf(hotkey)); return proxy; },
    stop   () { target.removeEventListener('keydown', onKeydown); return proxy; },
  };

  // hotkeys['ctrl+s'] is its exec, hotkeys['ctrl+s'] = 'save' sets it
  const proxy = keyed(dict, own, entry => entry.exec);
  return proxy;
}

// ::: the mod

// a command key goes to the app: the focused element can be outside of it (the body)
const hotkeys = (entries, { app }) => createHotkeys({ from: app }).assign(entries);

// :::::: EXPORT

export { Combo, Hotkey, Hotkeys, createHotkeys };
export default hotkeys;
