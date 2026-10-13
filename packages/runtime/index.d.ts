// @rat/runtime

export interface ReadSignal<T> {
  readonly value : T;
  peek () : T;
}

export interface Signal<T> extends ReadSignal<T> {
  value : T;
}

export type Child  = Node | string | number | boolean | null | undefined | (() => unknown) | Child[];
export type Props  = Record<string, unknown>;
export type Render = (...args: any[]) => Child;

export function signal<T>   (value?: T): Signal<T>;
export function computed<T> (fn: () => T): ReadSignal<T>;
export function effect      (fn: () => void): () => void;
export function batch<T>    (fn: () => T): T;
export function untrack<T>  (fn: () => T): T;
export function scope<T>    (fn: () => T, parent?: unknown): [T, () => void];
export function onCleanup   (fn: () => void): void;
export function isSignal    (value: unknown): boolean;
export function getOwner    (): unknown;

export function el     (tag: string | ((props: Props) => Child), props?: Props, children?: Child[]): Node | Child;
export function svg    (tag: string, props?: Props, children?: Child[]): SVGElement;
export function insert (parent: Node, value: Child, before?: Node | null): void;

export function when  (branches: [() => unknown, Render][], fallback?: Render): DocumentFragment;
export function match (subject: () => unknown, cases: [unknown, Render][], fallback?: Render): DocumentFragment;
export function each<T> (list: () => Iterable<T>, render: (item: T, index: number) => Child, fallback?: Render): DocumentFragment;

export class Range<T = number | string> implements Iterable<T> {
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

export function range (from: number, to: number): Range<number>;
export function range (from: string, to: string): Range<string>;

export type Behavior<V = unknown> = (element: Element, value: V, arg?: string) =>
  void | (() => void) | { update? (value: V): void, destroy? (): void };

export function use   (element: Element, behavior: Behavior, get?: () => unknown, arg?: string): void;
export function merge (...parts: (Props | null | undefined)[]): Props;
export function on    (handler: ((event: Event) => void) | string, options?: { keys?: string, prevent?: boolean, times?: number }): object;

export function mount (component: (props: Props) => Child, target: string | Element, props?: Props): () => void;
export function style (id: string, css: string): void;
