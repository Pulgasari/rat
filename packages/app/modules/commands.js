import { raise }                         from '@rat/runtime';
import { $Dict, Dict, Fn, KebabCase, Str } from '@rat/types';

const COMMAND  = 'rat:command';
const LITERALS = { false: false, null: null, true: true };

const Command = { '?description': Str, exec: Fn, '?title': Str };
const Schema  = Dict(Str.to(KebabCase), Command);

const argumentOf = text => text in LITERALS ? LITERALS[text] : /^-?\d+(\.\d+)?$/.test(text) ? Number(text) : text;

const parsed = new Map;

function parseCommand (text) {
  if (!parsed.has(text)) {
    const [, name = text, list = ''] = /^([^[\]]+)\[(.*)\]$/.exec(String(text).trim()) ?? [];
    parsed.set(text, { args: list.trim() ? list.split(',').map(part => argumentOf(part.trim())) : [], name: name.trim() });
  }
  return parsed.get(text);
}

function command (target, text, event = null, args = []) {
  const { args: written, name } = parseCommand(text);
  const type = name.includes(':') ? name : COMMAND;
  return target.dispatchEvent(new CustomEvent(type, { bubbles: true, cancelable: true, composed: true, detail: { args: [...written, ...args], event, name } }));
}

const commandListener = text => event => command(event.currentTarget, text, event);

class Commands extends $Dict {
  constructor (entries = {}) { super(Schema, entries); }

  read (entry) { return entry?.exec; }

  set (name, command) { return super.set(name, typeof command === 'function' ? { exec: command } : command); }

  assign (entries) {
    for (const [name, command] of Object.entries(entries)) this.set(name, command);
    return this;
  }

  run (text, ...args) {
    const { args: written, name } = parseCommand(text);
    return this.get(name)?.exec(...written, ...args);
  }

  listen (root = document) {
    const handle = event => {
      const { args = [], event: origin, name: text } = event.detail ?? {};
      const { args: written, name } = parseCommand(text);
      const entry = this.get(name);
      if (!entry) return;
      event.stopPropagation();
      const from = event.composedPath()[0];
      try { entry.exec(...written, ...args, origin)?.catch?.(error => raise(from, error)); }
      catch (error) { raise(from, error); }
    };
    root.addEventListener(COMMAND, handle);
    return () => root.removeEventListener(COMMAND, handle);
  }
}

export { COMMAND, Command, Commands, command, commandListener, parseCommand };
