// @rat/router

import type { ReadSignal } from '@rat/signals';

export type Query = Record<string, string>;

/** Where a route lives. */
export interface Mode {
  read (): { path: string, query: Query };
  write (path: string, options?: { replace?: boolean }): void;
  /** Calls fn when the place changes from outside (back, a typed url). Returns stop. */
  listen (fn: () => void): () => void;
  back? (): void;
  base? : string;
}

export interface LeaveEvent {
  readonly from : string;
  /** null when the page is closed (unload). */
  readonly to   : string | null;
  readonly unload? : boolean;
  readonly defaultPrevented : boolean;
  preventDefault (): void;
}

export interface Router {
  readonly $path  : ReadSignal<string>;
  readonly mode   : string | Mode;
  readonly path   : string;
  readonly query  : Query;
  /** Set by whoever knows the routes (an app matching its views). */
  params : Record<string, string>;

  /** A path, or a name through resolve(). Resolves to false when a guard refused. */
  go (to: string, options?: { replace?: boolean }): Promise<boolean>;
  back (): void;

  on (type: 'change', fn: (detail: { path: string, query: Query, router: Router }) => void): () => void;
  /** Async guards are awaited. { unload: true } asks on closing the tab as well, synchronously. */
  on (type: 'leave', fn: (event: LeaveEvent) => unknown, options?: { unload?: boolean }): () => void;
  match (pattern: string, fn: (params: Record<string, string>, router: Router) => void): () => void;

  /** Registers go and back as commands: go[settings], go[/notes/3], back. */
  bind (commands: { add (name: string, fn: (...args: any[]) => unknown): unknown }): Router;
  start (): Router;
  stop (): Router;
}

export interface RouterOptions {
  /** 'hash' (default), 'path', 'query', 'memory', 'none' (memory) or a Mode of your own. */
  mode?    : string | Mode;
  /** path mode: the part of the url before the routes. */
  base?    : string;
  /** query mode: the parameter holding the route. */
  key?     : string;
  /** memory mode: where it starts. */
  initial? : string;
  /** go(name): the path of a name, null when there is none. */
  resolve? : (name: string) => string | null | undefined;
  /** path mode: where link clicks are caught, document by default. */
  root?    : EventTarget | null;
}

export function createRouter (options?: RouterOptions): Router;

/** { params, rest } or null. exact: no rest allowed. */
export function matchRoute (pattern: string, path: string, options?: { exact?: boolean }): { params: Record<string, string>, rest: string } | null;
/** '/notes/:id' with { id: 3 } -> '/notes/3'. */
export function fill (pattern: string, params?: Record<string, unknown>): string;
/** '/settings' + 'profile' -> '/settings/profile'. */
export function join (...paths: string[]): string;
export function segmentsOf (path: string): string[];

export const MODES: Record<'hash' | 'memory' | 'path' | 'query', (options?: object) => Mode>;
export function modeOf (mode: string | Mode, options?: object): Mode | null;
