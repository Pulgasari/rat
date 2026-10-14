// @rat/runtime :: events

/*
event modifiers, written on the attribute and handed over by the compiler:

  on:keydown[enter]={send}            only for that key
  on:keydown[ctrl+c|space+a]={copy}   alternatives with |, combinations with +
  on:submit!={add}                    event.preventDefault() first
  on:click:once={init}                once, then never again
  on:click:3={tap}                    three times

the compiler turns them into on(handler, options), a plain listener function.

a combination is modifiers and held keys plus the key of the event: in
space+a, space has to be down when a is pressed. held keys come from one
shared tracker on the document, installed on first use.
*/

const ALIASES = {
  ' '    : 'space',
  arrowdown  : 'down',
  arrowleft  : 'left',
  arrowright : 'right',
  arrowup    : 'up',
  control    : 'ctrl',
  del        : 'delete',
  esc        : 'escape',
  escape     : 'escape',
  return     : 'enter',
};

const MODIFIERS = { alt: 'altKey', ctrl: 'ctrlKey', meta: 'metaKey', shift: 'shiftKey' };

const normalize = key => { const lower = String(key).toLowerCase(); return ALIASES[lower] ?? lower; };

// ::: held keys

const held = new Set;
let tracking = false;

function track () {
  if (tracking || typeof document === 'undefined') return;
  tracking = true;
  document.addEventListener('keydown', event => held.add(normalize(event.key)), true);
  document.addEventListener('keyup',   event => held.delete(normalize(event.key)), true);
  addEventListener('blur', () => held.clear());
}

// 'ctrl+c|space+a' -> [['ctrl', 'c'], ['space', 'a']]
const parseKeys = spec => spec.split('|').map(combo => combo.split('+').map(part => normalize(part.trim())).filter(Boolean));

function matches (event, combos) {
  const key = normalize(event.key);
  return combos.some(combo => {
    const last = combo[combo.length - 1];
    if (last !== key) return false;
    const before = combo.slice(0, -1);
    for (const [name, flag] of Object.entries(MODIFIERS)) if (event[flag] !== before.includes(name) && name !== key) return false;
    return before.every(part => MODIFIERS[part] || held.has(part));
  });
}

// ::: handler

// a command: fires 'rat:command' upwards, the app (or anyone) listens for it
const command = name => event => event.currentTarget.dispatchEvent(new CustomEvent('rat:command', {
  bubbles  : true,
  composed : true,
  detail   : { event, name },
}));

// the listener for { keys: 'enter', prevent: true, times: 1 } around a function
// or a command name. a string is resolved when the event fires
function on (handler, { keys, prevent = false, times = 0 } = {}) {
  const combos = keys ? parseKeys(keys) : null;
  if (combos?.some(combo => combo.length > 1)) track();
  let left = times;

  return function (event) {
    if (times && !left) return;
    if (combos && !matches(event, combos)) return;
    if (prevent) event.preventDefault();
    if (times) left--;
    (typeof handler === 'string' ? command(handler) : handler).call(this, event);
  };
}

export { command, on };
