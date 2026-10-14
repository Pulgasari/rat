// @rat/runtime

export interface ReadSignal<T> {
  readonly value : T;
  peek () : T;
}

export interface Signal<T> extends ReadSignal<T> {
  value : T;
}

export type Props = Record<string, unknown>;

/** What a template tag returns, rendered by @domina/render. */
export interface TemplateResult {
  program : unknown;
  values  : unknown[];
}

/** A compiled component: runs once, untracked, returns its view. */
export type Component = (props: Props, children?: TemplateResult | null) => unknown;

export function signal<T>   (value?: T): Signal<T>;
export function computed<T> (fn: () => T): ReadSignal<T>;
/** parent: who disposes the effect, the current owner unless given, null for no one. */
export function effect      (fn: () => void, parent?: unknown): () => void;
export function batch<T>    (fn: () => T): T;
export function untrack<T>  (fn: () => T): T;
export function scope<T>    (fn: () => T, parent?: unknown): [T, () => void];
export function onCleanup   (fn: () => void): void;
export function isSignal    (value: unknown): boolean;
export function getOwner    (): unknown;

/** The htx tag of @htx/js/render. */
export function html (strings: TemplateStringsArray, ...values: unknown[]): TemplateResult;

/** @domina/render with rat's effect and scope: functions in holes are live. */
export function render   (target: Element | DocumentFragment, value: unknown, options?: object): unknown;
export function unrender (target: Element | DocumentFragment): void;

export function each<T> (items: Iterable<T> | (() => Iterable<T>), key: (item: T, index: number) => unknown, row: (item: T, index: number) => unknown, otherwise?: (() => unknown) | null): unknown;
export function when    (condition: unknown, then: () => unknown, otherwise?: (() => unknown) | null): unknown;
export function match<T> (subject: T | (() => T), cases: [T, () => unknown][], otherwise?: (() => unknown) | null): unknown;
export function raw     (html: string | null | undefined): unknown;

/** What a..b makes: lazy, iterable, with the array methods. */
export interface Span<T = number | string> extends Iterable<T> {
  readonly length : number;
  at       (index: number): T | undefined;
  includes (value: T): boolean;
  indexOf  (value: T): number;
  toArray  (): T[];
  [Symbol.iterator] (): Iterator<T>;
  // plus every, filter, find, findIndex, flatMap, forEach, join, map, reduce, reduceRight,
  // reverse, slice, some, toReversed, toSorted: each runs on a fresh array
  [method: string]: unknown;
}

export function range   (from: number, to: number): Span<number>;
export function range   (from: string, to: string): Span<string>;
export function isRange (value: unknown): value is Span;

export type Behavior<V = unknown> = (element: Element, value: V, arg?: string) =>
  void | (() => void) | { update? (value: V): void, destroy? (): void };

/** A ref running a behavior, again or through update() when the value changes. */
export function use  (behavior: Behavior, get?: (() => unknown) | null, arg?: string): (element: Element) => void;
/** A ref binding a property to a signal both ways. */
export function bind (source: Signal<unknown>, name: string): (element: Element) => void;
/** A ref writing the element into a signal, or calling a function with it. */
export function ref  (target: Signal<unknown> | ((element: Element) => void) | null | undefined): (element: Element) => void;

/** The handler behind a key filter, preventDefault and a call limit. A string handler names a command. */
export function listener        (handler: ((event: Event) => void) | string, options?: { keys?: string, prevent?: boolean, times?: number }): (event: Event) => void;
/** A listener firing 'rat:command' upwards with { event, name }. */
export function commandListener (name: string): (event: Event) => void;

export function mount (component: Component, target: string | Element, props?: Props): () => void;
export function style (id: string, css: string): void;
