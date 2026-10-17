// @rat/hotkeys :: keys

/*
key names, combos and the keys held down. one notation everywhere: in markup
(on:keydown[ctrl+s]) and in createHotkeys().

  'ctrl+s', 'ctrl + s'      a combo: modifiers and held keys, then the key
  'ctrl+c|space+a'          alternatives
  'space+a'                 space has to be down when a is pressed
  arrow-left, arrowleft     all name the key 'left' (the same for up, down, right)

a combo matches the modifiers exactly: ctrl+c does not fire on ctrl+shift+c.
which keys are down is tracked only once a combo needs it.
*/

const ALIASES = {
  ' '           : 'space',
  'arrow-down'  : 'down',
  'arrow-left'  : 'left',
  'arrow-right' : 'right',
  'arrow-up'    : 'up',
  arrowdown     : 'down',
  arrowleft     : 'left',
  arrowright    : 'right',
  arrowup       : 'up',
  cmd           : 'meta',
  command       : 'meta',
  control       : 'ctrl',
  del           : 'delete',
  esc           : 'escape',
  option        : 'alt',
  return        : 'enter',
};

// the modifiers an event carries as flags, no tracking needed for them
const MODIFIERS = { alt: 'altKey', ctrl: 'ctrlKey', meta: 'metaKey', shift: 'shiftKey' };

const keyName = key => { const lower = String(key).toLowerCase(); return ALIASES[lower] ?? lower; };

// ::: held keys

// every key that is down right now, by name. one tracker for the whole document
const heldKeys = new Set;
let   tracking = false;

function trackHeldKeys () {
  if (tracking || typeof document === 'undefined') return;
  tracking = true;
  document.addEventListener('keydown', event => heldKeys.add(keyName(event.key)), true);
  document.addEventListener('keyup',   event => heldKeys.delete(keyName(event.key)), true);
  addEventListener('blur', () => heldKeys.clear());
}

// ::: combos

// 'ctrl + c|space+a' -> [['ctrl', 'c'], ['space', 'a']]. a combo that holds other keys than modifiers starts the tracker
function parseCombos (keys) {
  const combos = String(keys).split('|').map(combo => combo.split('+').map(part => keyName(part.trim())).filter(Boolean)).filter(combo => combo.length);
  if (combos.some(combo => combo.slice(0, -1).some(part => !MODIFIERS[part]))) trackHeldKeys();
  return combos;
}

// the event's key is the last one of a combo, the ones before it are down
function matchesCombo (event, combo) {
  const key = keyName(event.key);
  if (combo[combo.length - 1] !== key) return false;
  const before = combo.slice(0, -1);
  for (const [name, flag] of Object.entries(MODIFIERS)) if (name !== key && event[flag] !== before.includes(name)) return false;
  return before.every(part => MODIFIERS[part] || heldKeys.has(part));
}

const matchesCombos = (event, combos) => combos.some(combo => matchesCombo(event, combo));

// :::::: EXPORT

export { MODIFIERS, keyName, matchesCombo, matchesCombos, parseCombos, trackHeldKeys };
