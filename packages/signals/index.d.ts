// @rat/signals

export interface ReadSignal<T> {
  readonly value : T;
  peek () : T;
}

export interface Signal<T> extends ReadSignal<T> {
  value : T;
}

/** Anything with a standard schema interface: @rat/types, zod, valibot, arktype. */
export interface StandardSchema<T = unknown> {
  readonly '~standard': {
    readonly version : 1;
    readonly vendor  : string;
    validate (value: unknown): { value: T, issues?: undefined } | { issues: readonly { message: string }[] } | Promise<unknown>;
  };
  /** where a signal starts, @rat/types sets it (Enum: the first value, .default(x): x) */
  readonly initial?: T;
}

/** A schema as the value starts at its initial value and checks every write (d-14 a). */
export function signal<T>   (schema: StandardSchema<T>): Signal<T>;
export function signal<T>   (value?: T): Signal<T>;
export function computed<T> (getter: (previous?: T) => T): ReadSignal<T>;
/** Runs fn now and on every change. parent: who disposes it, the current owner unless given, null for no one. fn may return a cleanup. */
export function effect      (fn: () => void | (() => void), parent?: unknown): () => void;
/** Runs fn untracked as owner of what it creates. */
export function scope<T>    (fn: () => T, parent?: unknown): [T, () => void];
export function batch<T>    (fn: () => T): T;
export function untrack<T>  (fn: () => T): T;
export function onCleanup   (fn: () => void): void;
export function getOwner    (): unknown;
export function isSignal    (value: unknown): value is ReadSignal<unknown>;
export function isSchema    (value: unknown): value is StandardSchema;

/** Methods and getters that read subscribe, methods and setters that write notify. A write check returns false when nothing changes. */

/** A subclass of Base whose instances report reads and writes: a getter reads, a setter writes, a method writes when its name is a write (set, push, toggle …, SET), else reads. */
export function reactive<C extends new (...args: any[]) => any> (Base: C): C;
/** The names of the methods that write, in every class: reactive() and $Array tell reads from writes by them. */
export const WRITES: ReadonlySet<string | symbol>;
/** The name of a write that sets one field (a Record's, a scalar's value). */
export const SET: unique symbol;
export function isReactive (value: unknown): boolean;
/** The registered variant for a value, or the value itself. */
export function wrap<T> (value: T): T;
/** Registers a variant: a class as kind means instanceof, a function is a test. */
export function register (kind: (new (...args: any[]) => any) | ((value: unknown) => boolean), make: (new (value: any) => any) | ((value: any) => unknown)): void;

/** Makes a value reactive: always a signal; its value goes through the registry, now and on every write. */
export const $: {
  <T>(schema: StandardSchema<T>): Signal<T>;
  <T>(value?: T): Signal<T>;
  register: typeof register;
};

export const REACTIVE: unique symbol;

/** A value with a method under this symbol makes its own signal in $(): a schema with .stored() one that is kept. */
export const SIGNAL: unique symbol;

/** value[SCHEMA]: the schema a data type was made by ($List(Tab).create()), for stored(). */
export const SCHEMA: unique symbol;
/** schema[STORED]: the options of .stored() on a schema (@rat/types), for stored(). */
export const STORED: unique symbol;

export interface StoredOptions {
  /** What it is kept under. A key written on the schema wins over the one of the call (the name of $x!). */
  key?      : string;
  /** The place: 'store', 'session', 'database', 'memory' or one of stored.place(). Default: the schema's (a Table: 'database'), else stored.defaults.in, else 'store'. */
  in?       : string;
  /** false: the key as it is. Else, made inside a named view, part or area, their names go before it: podcasts:tabs. */
  scope?    : boolean;
  /** Ms after a change before it is written. Default: once per microtask. */
  debounce? : number;
  /** A change from elsewhere (another tab) comes in. */
  sync?     : boolean;
  /** The version of the shape: what was kept under another goes through migrate. */
  version?  : number;
  /** The value in today's shape, undefined drops it. */
  migrate?  : (old: unknown, version: number) => unknown;
}

/** Where kept values live: a @rat/bunker store is one. Answers at once through peek, else through get. */
export interface Place {
  peek?   (key: string): unknown;
  get?    (key: string): Promise<unknown>;
  set     (key: string, value: unknown): unknown;
  delete  (key: string): unknown;
  on?     (type: 'change', fn: (change: { keys: string[], type: string }) => void): () => void;
  load?   (): Promise<void>;
  loaded? : boolean;
  sync?   : boolean;
}

/**
 * A value kept beyond the page: read back now, written on every change. A schema or a plain value gives a
 * signal (the same key twice: the same signal), a reactive variant is kept in place and returned.
 * The compiler's let $name! = … is stored('name', …).
 */
export declare const stored: {
  <T>(options: string | StoredOptions, init: StandardSchema<T>): Signal<T>;
  <V extends object>(options: string | StoredOptions, init: V): V;
  <T>(options: string | StoredOptions, init?: T): Signal<T>;
  /** Back to its initial value and gone from its place: in names one place, else every place. */
  forget (key: string, options?: { in?: string }): Promise<unknown[]>;
  /** A place under its name: @rat/app sets 'store' (RAT.app.store, read ahead) and 'database'. */
  place (name: string, place: Place): void;
  /** The names a key gets before it, where it is made. @rat/app: the named views, parts and areas around the component. */
  scope (): string[];
  /** The place of everything that names none (config.rat.js: stored: { in }). */
  defaults : { in: string | null };
  /** Every pending write, now (pagehide and a hidden page do it). */
  flush (): void;
};

