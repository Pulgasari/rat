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

/** Methods that read subscribe, methods that write notify. A write check returns false when nothing changes. */
export interface Variant {
  reads?  : (string | symbol)[];
  writes? : (string | symbol)[] | Record<string | symbol, true | ((target: any, ...args: any[]) => boolean)>;
}

/** A subclass of Base whose instances report reads and writes. */
export function reactive<C extends new (...args: any[]) => any> (Base: C, variant: Variant): C;
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
