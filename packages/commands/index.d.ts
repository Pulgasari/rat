// @rat/commands

export type Command = (...args: any[]) => unknown;

export interface Commands {
  add (id: string, fn: Command): Commands;
  get (id: string): Command | undefined;
  has (id: string): boolean;
  list (): string[];
  /** Runs the 'rat:command' events that reach root and that this registry knows, and stops them there. Returns stop. */
  listen (root?: EventTarget): () => void;
  remove (id: string): Commands;
  run (id: string, ...args: unknown[]): unknown;
  /** Any other key is a command: commands.save(), commands.save = fn. */
  [name: string]: any;
}

/** Names are one across kebab, camel and snake case. */
export function createCommands (source?: Record<string, Command>): Commands;
/** Fires a bubbling, composed 'rat:command' with { event, name } from target. */
export function command (target: EventTarget, name: string, event?: Event | null): boolean;
/** The handler a compiled onclick='save' gets. */
export function commandListener (name: string): (event: Event) => void;
/** 'toggle-play', 'toggle_play' -> 'togglePlay'. */
export function nameOf (id: string): string;
export const COMMAND: 'rat:command';
