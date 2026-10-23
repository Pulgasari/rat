// @rat/hotkeys

export type Handler = (event: KeyboardEvent) => unknown;

export interface Binding {
  /** A command name or a function. `action` is read as well. */
  command         : string | Handler;
  /** Fires in inputs too, without ctrl, alt or meta held. */
  global?         : boolean;
  /** True unless set to false. */
  preventDefault? : boolean;
  when?           : (event: KeyboardEvent) => boolean;
}

export interface Hotkeys {
  /** { 'ctrl+s': 'save' | fn | Binding }. A combo bound again replaces the old one. */
  assign (map: Record<string, string | Handler | Binding>): Hotkeys;
  /** The same as assign. */
  define (map: Record<string, string | Handler | Binding>): Hotkeys;
  destroy (): void;
  /** The binding of a combo as it was given. */
  get (keys: string): string | Handler | Binding | undefined;
  list (): string[];
  remove (...keys: (string | string[])[]): Hotkeys;
  set (keys: string, value: string | Handler | Binding): Hotkeys;
  /** Any other key is a combo: hotkeys['ctrl+s'] = 'save', delete hotkeys['ctrl+s']. */
  [keys: string]: any;
}

/** Names run through commands, else through fire, else they fire 'rat:command' from the focused element. */
export function createHotkeys (options?: { commands?: { run (name: string, ...args: unknown[]): unknown } | null, fire?: (name: string) => Handler, target?: EventTarget }): Hotkeys;

export const MODIFIERS: { alt: 'altKey', ctrl: 'ctrlKey', meta: 'metaKey', shift: 'shiftKey' };
/** 'ArrowLeft', 'arrow-left' -> 'left'; ' ' -> 'space'; 'Control' -> 'ctrl'. */
export function keyName (key: string): string;
/** 'ctrl + c|space+a' -> [['ctrl', 'c'], ['space', 'a']]. */
export function parseCombos (keys: string): string[][];
export function matchesCombo (event: KeyboardEvent, combo: string[]): boolean;
export function matchesCombos (event: KeyboardEvent, combos: string[][]): boolean;
/** Tracks which keys are down; parseCombos starts it when a combo needs it. */
export function trackHeldKeys (): void;
