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

export function range (from: number, to: number): number[];
export function range (from: string, to: string): string[];

export function mount (component: (props: Props) => Child, target: string | Element, props?: Props): () => void;
export function style (id: string, css: string): void;
