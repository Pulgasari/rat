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
  /** { 'ctrl+s': 'save' | fn | Binding }. A combo defined again replaces the old one. */
  define (map: Record<string, string | Handler | Binding>): Hotkeys;
  destroy (): void;
  list (): string[];
  remove (...keys: (string | string[])[]): Hotkeys;
}

/** Names run through commands; without them they fire 'rat:command' from the focused element. */
export function createHotkeys (options?: { commands?: { run (name: string, ...args: unknown[]): unknown } | null, target?: EventTarget }): Hotkeys;

export const MODIFIERS: { alt: 'altKey', ctrl: 'ctrlKey', meta: 'metaKey', shift: 'shiftKey' };
/** 'ArrowLeft', 'arrow-left' -> 'left'; ' ' -> 'space'; 'Control' -> 'ctrl'. */
export function keyName (key: string): string;
/** 'ctrl + c|space+a' -> [['ctrl', 'c'], ['space', 'a']]. */
export function parseCombos (keys: string): string[][];
export function matchesCombo (event: KeyboardEvent, combo: string[]): boolean;
export function matchesCombos (event: KeyboardEvent, combos: string[][]): boolean;
/** Tracks which keys are down; parseCombos starts it when a combo needs it. */
export function trackHeldKeys (): void;
