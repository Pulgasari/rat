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

/** A $Dict of the app's commands: one kebab-case key per command, entries as properties (commands.togglePlay() runs it). */
export interface Commands extends Map<string, { description?: string, exec: (...args: any[]) => unknown, title?: string }> {
  [name: string]: any;
  set (name: string, command: ((...args: any[]) => unknown) | { description?: string, exec: (...args: any[]) => unknown, title?: string }): this;
  assign (entries: Record<string, ((...args: any[]) => unknown) | { exec: (...args: any[]) => unknown }>): this;
  /** run('save'), run('go[settings]'), run('go', 'settings'). */
  run (text: string, ...args: unknown[]): unknown;
  /** Runs the 'rat:command' events that reach root and stops them there. */
  listen (root?: EventTarget): () => void;
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

  readonly commands : Commands;
  readonly router   : import('./modules/router.js').Router;
  /** The config of config.rat.js, {} without one. */
  readonly config   : Record<string, any>;
  /** config-src: another file than config.rat.js next to src. */
  configSrc?        : string;
  readonly view     : RatView | null;
  readonly views    : RatView[];
  readonly areas    : RatArea[];

  area (name: string): RatArea | null;
  /** An area opened or closed by its name: force true opens, false closes, none flips. */
  toggle (name: string, force?: boolean): RatArea | null;
  /** The views of a path, the outermost first, and the params of all levels. */
  match (path: string): { params: Record<string, string>; views: RatView[] };
  /** ready() waits for it too, a failure goes to fail(). */
  hold<T> (promise: Promise<T>): Promise<T>;
  /** Loads src (or the module of the importer handed over) and mounts its component in place of what the app holds. */
  start (importer?: () => Promise<object>, config?: Record<string, any>): Promise<void>;
  /** A build hands over the config and how to import the component (@rat/dev): the mods first, then the app's modules. */
  run (importer: () => Promise<object>, config?: Record<string, any>): Promise<void>;
  /** The last error boundary: shows an error in a popover over the app. */
  report (error: unknown): void;
  /** Its own events, fn gets the value, returns the stop. error: a failed action (a handler or command that threw, a promise nobody awaited); without a listener report(). DOM events: RAT.dom(app).on(…). */
  on (type: 'error', fn: (error: unknown) => void): () => void;
  on (type: 'mount' | 'ready', fn: () => void): () => void;
  on (type: 'navigate', fn: (navigation: { from: string | null; to: string | null; path: string; params: Record<string, string> }) => void): () => void;
  /** A failed action: to on('error'), else report(). An AbortError goes nowhere. */
  fail (error: unknown): void;
  /** Loads config.rat.js once (or takes the config handed over): RAT and the mods. */
  configure (config?: Record<string, any>): Promise<Record<string, any>>;
  /** Ends [loading], in a view transition. */
  ready (): Promise<void>;
}

/** A view of the app, activated by its router only. */
export class RatView extends HTMLElement {
  active      : boolean;
  name?       : string;
  route?      : string;
  src?        : string;
  /** A component in place of src, mounted the same way (the params as props): a build sees it as an import. */
  component?  : ((props: Record<string, unknown>) => unknown) | null;
  transition? : string;
  readonly app    : RatApp | null;
  readonly loaded : boolean;
  /** Its own events, fn gets the value, returns the stop. leave is a guard. DOM events: RAT.dom(view).on(…). */
  on (type: 'leave', fn: (event: import('./modules/router.js').LeaveEvent) => unknown, options?: { unload?: boolean }): () => void;
  on (type: 'enter', fn: (entered: { params: Record<string, string> }) => void): () => void;
  on (type: 'left' | 'mount', fn: () => void): () => void;
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
  /** Its own events, fn gets the value, returns the stop. DOM events: RAT.dom(area).on(…). */
  on (type: 'toggle', fn: (state: { expanded: boolean; open: boolean }) => void): () => void;
}

/** The app from anywhere. */
/** The app from anywhere. As RAT on globalThis with RAT: true in config.rat.js, else import RAT from '@rat/app'. */
export const rat: {
  readonly app    : RatApp | null;
  readonly config : Record<string, any> | null;
  /** @domina/dom: RAT.dom('.card').on('click', …), RAT.dom.addEventListener(…), like document. */
  readonly dom    : typeof import('@domina/dom').dom;
  toggle (name: string, force?: boolean): RatArea | null;
};

export default rat;

declare global {
  /** With RAT: true in config.rat.js. */
  var RAT: typeof rat;
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
