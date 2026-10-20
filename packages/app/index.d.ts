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

/** The root of an app, one per page: router, commands, views, areas. src mounts a .rat file into it. */
export class RatApp extends HTMLElement {
  routing    : 'hash' | 'path' | 'query' | 'memory' | 'none';
  src?       : string;
  base?      : string;
  loading    : boolean;
  transition : string;
  density?   : string;
  geometry?  : string;
  layout?    : string;
  look?      : string;
  mode?      : string;
  palette?   : string;
  skin?      : string;

  readonly commands : import('@rat/commands').Commands;
  readonly router   : import('@rat/router').Router;
  readonly view     : RatView | null;
  readonly views    : RatView[];
  readonly areas    : RatArea[];

  area (name: string): RatArea | null;
  /** The views of a path, the outermost first, and the params of all levels. */
  match (path: string): { params: Record<string, string>; views: RatView[] };
  /** ready() waits for it too. */
  hold<T> (promise: Promise<T>): Promise<T>;
  /** Loads src and mounts it in place of what the app holds. */
  start (): Promise<void>;
  /** The last error boundary: shows an error in a popover over the app. */
  report (error: unknown): void;
  /** Ends [loading], in a view transition. */
  ready (): Promise<void>;
}

/** A view of the app, activated by its router only. */
export class RatView extends HTMLElement {
  active      : boolean;
  name?       : string;
  route?      : string;
  src?        : string;
  transition? : string;
  readonly app    : RatApp | null;
  readonly loaded : boolean;
  /** A leave guard, returns its stop. Any other type is an event listener. */
  on (type: 'leave', fn: (event: import('@rat/router').LeaveEvent) => unknown, options?: { unload?: boolean }): () => void;
  on (type: string, ...args: unknown[]): this;
}

/** A region of the app: sidebar, drawer, bottom sheet, or main. */
export class RatArea extends HTMLElement {
  breakpoint : string;
  dock       : 'bottom' | 'end' | 'none' | 'start';
  expanded   : boolean;
  name?      : string;
  open       : boolean;
  overlay    : 'always' | 'auto' | 'never';
  peek       : boolean;
  readonly app       : RatApp | null;
  readonly isOverlay : boolean;
  show (): this;
  hide (): this;
  toggle (force?: boolean): this;
  expand (force?: boolean): this;
}

/** The blob url of a compiled .rat / .rat.js file, its imports rewritten. One compile per url. */
export function compileFile (url: string | URL): Promise<string>;
/** The module of a .rat / .rat.js file. */
export function load (url: string | URL): Promise<Record<string, unknown>>;
/** The default export of a module, else its first function. */
export function componentOf (module: Record<string, unknown>): ((props?: object) => unknown) | null;

declare global {
  interface HTMLElementTagNameMap {
    'rat-app'  : RatApp;
    'rat-area' : RatArea;
    'rat-part' : RatPart;
    'rat-view' : RatView;
  }
}
