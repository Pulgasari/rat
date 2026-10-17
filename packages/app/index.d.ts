// @rat/app

/** Mounts the component of a .rat / .rat.js file into itself. load: eager (default), visible, idle. */
export class RatPart extends HTMLElement {
  /** Handed to the component when it mounts. */
  props : Record<string, unknown>;
  readonly mode : 'eager' | 'visible' | 'idle';
  /** Loads src and mounts, unmounting what was there. */
  start (): Promise<void>;
  /** Unmounts, and drops a load still on its way. */
  stop (): void;
}

/** The entry of an app: a RatPart that always loads right away. */
export class RatApp extends RatPart {}

/** The blob url of a compiled .rat / .rat.js file, its imports rewritten. One compile per url. */
export function compileFile (url: string | URL): Promise<string>;
/** The module of a .rat / .rat.js file. */
export function load (url: string | URL): Promise<Record<string, unknown>>;
/** The default export of a module, else its first function. */
export function componentOf (module: Record<string, unknown>): ((props?: object) => unknown) | null;

declare global {
  interface HTMLElementTagNameMap {
    'rat-app'  : RatApp;
    'rat-part' : RatPart;
  }
}
