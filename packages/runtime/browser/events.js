// @rat/runtime :: events

/*
the listeners compiled event attributes turn into. two kinds:

  listener(handler, options)   the handler, behind the modifiers written on the attribute
  commandListener(name)        fires 'rat:command' with { event, name } upwards (@rat/commands)

modifiers, as written and as handed over by the compiler:

  on:keydown[enter]={send}            keys: 'enter'          only for that key
  on:keydown[ctrl+c|space+a]={copy}   keys: 'ctrl+c|space+a' alternatives with |, combinations with +
  on:submit!={add}                    prevent: true          event.preventDefault() first
  on:click:once={init}                times: 1               once, then never again
  on:click:3={tap}                    times: 3               three times at most

the key notation is @rat/hotkeys', the same as for app-wide hotkeys.
*/

import { commandListener }             from '@rat/commands';
import { matchesCombos, parseCombos }  from '@rat/hotkeys';

// a string handler names a command, resolved when the event fires: the value
// may come from an expression (onclick={item.command})
function listener (handler, { keys = null, prevent = false, times = 0 } = {}) {
  const combos = keys ? parseCombos(keys) : null;
  let   left   = times;

  return function (event) {
    if (times && !left) return;
    if (combos && !matchesCombos(event, combos)) return;
    if (prevent) event.preventDefault();
    if (times) left--;
    (typeof handler === 'string' ? commandListener(handler) : handler).call(this, event);
  };
}

// :::::: EXPORT

export { commandListener, listener };
