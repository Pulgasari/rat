import { COMMAND, parseCommand, raise }  from '@rat/runtime';
import { $Dict, Dict, Fn, KebabCase, Str } from '@rat/types';

const Command = { '?description': Str, exec: Fn, '?title': Str };
const Schema  = Dict(Str.to(KebabCase), Command);

class Commands extends $Dict {
  constructor (entries = {}) { super(Schema, entries); }

  read (entry) { return entry?.exec; }

  set (name, command) { return super.set(name, typeof command === 'function' ? { exec: command } : command); }

  assign (entries) {
    for (const [name, command] of Object.entries(entries)) this.set(name, command);
    return this;
  }

  run (text, ...args) {
    const { args: inText, name } = parseCommand(text);
    return this.get(name)?.exec(...inText, ...args);
  }

  listen (root = document) {
    const handle = event => {
      const { args = [], event: origin, name } = event.detail ?? {};
      const entry = this.get(name);
      if (!entry) return;
      event.stopPropagation();
      const from = event.composedPath()[0];
      try { entry.exec(...args, origin)?.catch?.(error => raise(from, error, 'handler')); }
      catch (error) { raise(from, error, 'handler'); }
    };
    root.addEventListener(COMMAND, handle);
    return () => root.removeEventListener(COMMAND, handle);
  }
}

export { Command, Commands };
