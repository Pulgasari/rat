// @rat/runtime :: events

/*
the listeners compiled event attributes turn into. two kinds:

  listener(handler, options)   the handler, behind the modifiers written on the attribute
  commandListener(name)        fires 'rat:command' with { event, name } upwards

modifiers, as written and as handed over by the compiler:

  on:keydown[enter]={send}            keys: 'enter'          only for that key
  on:keydown[ctrl+c|space+a]={copy}   keys: 'ctrl+c|space+a' alternatives with |, combinations with +
  on:submit!={add}                    prevent: true          event.preventDefault() first
  on:click:once={init}                times: 1               once, then never again
  on:click:3={tap}                    times: 3               three times at most

a combination is modifiers and held keys plus the key of the event: in space+a,
space has to be down when a is pressed. which keys are down is known only once
the held keys are tracked, on the first combination that needs it.
*/

// :::::: KEY NAMES

const ALIASES = {
  ' '        : 'space',
  arrowdown  : 'down',
  arrowleft  : 'left',
  arrowright : 'right',
  arrowup    : 'up',
  control    : 'ctrl',
  del        : 'delete',
  esc        : 'escape',
  return     : 'enter',
};

// the modifiers an event carries as flags, no tracking needed for them
const MODIFIERS = { alt: 'altKey', ctrl: 'ctrlKey', meta: 'metaKey', shift: 'shiftKey' };

const keyName = key => { const lower = String(key).toLowerCase(); return ALIASES[lower] ?? lower; };

// :::::: HELD KEYS

// every key that is down right now, by name. one tracker for the whole document
const heldKeys = new Set;
let tracking   = false;

function trackHeldKeys () {
  if (tracking || typeof document === 'undefined') return;
  tracking = true;
  document.addEventListener('keydown', event => heldKeys.add(keyName(event.key)), true);
  document.addEventListener('keyup',   event => heldKeys.delete(keyName(event.key)), true);
  addEventListener('blur', () => heldKeys.clear());
}

// :::::: COMBOS

// 'ctrl+c|space+a' -> [['ctrl', 'c'], ['space', 'a']]
const parseCombos = keys => keys.split('|').map(combo => combo.split('+').map(part => keyName(part.trim())).filter(Boolean));

// the event's key is the last one of a combo, the ones before it are down: the
// modifiers exactly (ctrl+c does not fire on ctrl+shift+c), other keys held
function matchesCombos (event, combos) {
  const key = keyName(event.key);
  return combos.some(combo => {
    if (combo[combo.length - 1] !== key) return false;
    const before = combo.slice(0, -1);
    for (const [name, flag] of Object.entries(MODIFIERS)) if (name !== key && event[flag] !== before.includes(name)) return false;
    return before.every(part => MODIFIERS[part] || heldKeys.has(part));
  });
}

// :::::: LISTENERS

const commandListener = name => event => event.currentTarget.dispatchEvent(new CustomEvent('rat:command', {
  bubbles  : true,
  composed : true,
  detail   : { event, name },
}));

// a string handler names a command, resolved when the event fires: the value
// may come from an expression (onclick={item.command})
function listener (handler, { keys = null, prevent = false, times = 0 } = {}) {
  const combos = keys ? parseCombos(keys) : null;
  let left     = times;

  if (combos?.some(combo => combo.length > 1)) trackHeldKeys();

  return function (event) {
    if (times && !left) return;
    if (combos && !matchesCombos(event, combos)) return;
    if (prevent) event.preventDefault();
    if (times) left--;
    (typeof handler === 'string' ? commandListener(handler) : handler).call(this, event);
  };
}

export { commandListener, listener };
