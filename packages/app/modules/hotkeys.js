import { matchesCombo, parseCombos } from '@rat/hotkeys';
import { $Dict, Bool, Dict, Fn, Str, Union } from '@rat/types';

import { command } from './commands.js';

const combos = new Map;

const combosOf = keys => {
  if (!combos.has(keys)) combos.set(keys, parseCombos(keys));
  return combos.get(keys);
};

const Combo  = Str.case({ transform: keys => combosOf(keys).map(combo => combo.join('+')).join('|') });
const Hotkey = { '?description': Str, exec: Union(Fn, Str), '?global': Bool, '?preventDefault': Bool, '?title': Str, '?when': Fn };
const Schema = Dict(Str.to(Combo), Hotkey);

const isEditable = element => !!element && (/^(INPUT|SELECT|TEXTAREA)$/.test(element.tagName) || element.isContentEditable);
const isTyping   = event => !(event.ctrlKey || event.metaKey || event.altKey) && isEditable(event.composedPath?.()[0] ?? event.target);

class Hotkeys extends $Dict {
  constructor (entries = {}) { super(Schema, entries); }

  read (entry) { return entry?.exec; }

  set (keys, hotkey) { return super.set(keys, typeof hotkey === 'object' ? hotkey : { exec: hotkey }); }

  assign (entries) {
    for (const [keys, hotkey] of Object.entries(entries)) this.set(keys, hotkey);
    return this;
  }

  listen (target = globalThis, { commands = null, from = null } = {}) {
    const run = (exec, event) => typeof exec === 'function' ? exec(event)
      : commands ? commands.run(exec, event)
      : command(from ?? event.composedPath?.()[0] ?? document.activeElement ?? document, exec, event);

    const keydown = event => {
      if (event.defaultPrevented) return;
      for (const [keys, hotkey] of this) {
        if (!combosOf(keys).some(combo => matchesCombo(event, combo))) continue;
        if (!hotkey.global && isTyping(event)) return;
        if (hotkey.when && !hotkey.when(event)) continue;
        if (hotkey.preventDefault !== false) event.preventDefault();
        run(hotkey.exec, event);
        return;
      }
    };

    target.addEventListener('keydown', keydown);
    return () => target.removeEventListener('keydown', keydown);
  }
}

const hotkeys = (entries, { app }) => {
  const hotkeys = new Hotkeys(entries);
  hotkeys.listen(globalThis, { from: app });
  return hotkeys;
};

export { Hotkey, Hotkeys };
export default hotkeys;
