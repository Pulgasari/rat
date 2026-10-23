// @rat/commands

export type Command = (...args: any[]) => unknown;

export interface Commands {
  add (id: string, fn: Command): Commands;
  /** Several at once: { save, 'toggle-play': fn }. */
  assign (entries: Record<string, Command>): Commands;
  get (id: string): Command | undefined;
  has (id: string): boolean;
  list (): string[];
  /** Runs the 'rat:command' events that reach root and that this registry knows, and stops them there: fn(...args, event). Returns stop. */
  listen (root?: EventTarget): () => void;
  remove (id: string): Commands;
  /** run('go', 'settings') or run('go[settings]'). */
  run (id: string, ...args: unknown[]): unknown;
  /** The same as add. */
  set (id: string, fn: Command): Commands;
  /** Any other key is a command: commands.save(), commands['toggle-play'] = fn. */
  [name: string]: any;
}

/** Names are one across kebab, camel and snake case. */
export function createCommands (source?: Record<string, Command>): Commands;
/** Fires a bubbling, composed 'rat:command' with { args, event, name } from target. 'go[settings]' brings its arguments. */
export function command (target: EventTarget, text: string, event?: Event | null, args?: unknown[]): boolean;
/** The handler a compiled onclick='save' or onclick='go[settings]' gets. */
export function commandListener (text: string): (event: Event) => void;
/** 'move[up, 3]' -> { name: 'move', args: ['up', 3] }: numbers, true, false, null as such, the rest strings. */
export function parseCommand (text: string): { name: string, args: unknown[] };
/** 'toggle-play', 'toggle_play' -> 'togglePlay'. */
export function nameOf (id: string): string;
export const COMMAND: 'rat:command';
