// @rat/runtime :: commands

/*
a string handler in markup is a command: onclick='save' fires a bubbling 'rat:command'
with { args, event, name }, a registry above takes it (Commands of @rat/app). arguments
go in brackets, onclick='move[up, 3]'. a name with : is an event of its own:
onclick='rat:toggle[menu]' fires 'rat:toggle'
*/

const COMMAND  = 'rat:command';
const LITERALS = { false: false, null: null, true: true };

const argumentOf = text => text in LITERALS ? LITERALS[text] : /^-?\d+(\.\d+)?$/.test(text) ? Number(text) : text;

const parsed = new Map;

// 'move[up, 3]' -> { args: ['up', 3], name: 'move' }
function parseCommand (text) {
  if (!parsed.has(text)) {
    const [, name = text, list = ''] = /^([^[\]]+)\[(.*)\]$/.exec(String(text).trim()) ?? [];
    parsed.set(text, { args: list.trim() ? list.split(',').map(part => argumentOf(part.trim())) : [], name: name.trim() });
  }
  return parsed.get(text);
}

// the arguments in the text first, then the ones handed over
function command (target, text, event = null, args = []) {
  const { args: inText, name } = parseCommand(text);
  const type = name.includes(':') ? name : COMMAND;
  return target.dispatchEvent(new CustomEvent(type, { bubbles: true, cancelable: true, composed: true, detail: { args: [...inText, ...args], event, name } }));
}

const commandListener = text => event => command(event.currentTarget, text, event);

// :::::: EXPORT

export { COMMAND, command, commandListener, parseCommand };
