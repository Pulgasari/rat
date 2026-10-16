// @rat/runtime

import type { Signal } from '@rat/signals';

/** The signal layer: signal, computed, effect, scope, batch, untrack, onCleanup, $(), reactive() … */
export * from '@rat/signals';

export type Props = Record<string, unknown>;

/** What a template tag returns, rendered by @domina/render. */
export interface TemplateResult {
  program : unknown;
  values  : unknown[];
}

/** A compiled component: runs once, untracked, returns its view. */
export type Component = (props: Props, children?: TemplateResult | null) => unknown;

/** The htx tag of @htx/js/render. */
export function html (strings: TemplateStringsArray, ...values: unknown[]): TemplateResult;

/** @domina/render with rat's effect and scope: functions in holes are live. */
export function render   (target: Element | DocumentFragment, value: unknown, options?: object): unknown;
export function unrender (target: Element | DocumentFragment): void;

export function each<T> (items: Iterable<T> | (() => Iterable<T>), key: (item: T, index: number) => unknown, row: (item: T, index: number) => unknown, otherwise?: (() => unknown) | null): unknown;
export function when    (condition: unknown, then: () => unknown, otherwise?: (() => unknown) | null): unknown;
export function match<T> (subject: T | (() => T), cases: [T, () => unknown][], otherwise?: (() => unknown) | null): unknown;
export function raw     (html: string | null | undefined): unknown;

/** A named case: the parts it hands out, or null for no match. */
export type Pattern<P extends object = object> = ((value: unknown) => P | null) & { readonly __pattern: true };

export function pattern<P extends object> (fn: (value: unknown) => P | null): Pattern<P>;
export function isPattern (value: unknown): value is Pattern;
/** value is Case: a pattern decides, anything else compares with Object.is. */
export function is        (value: unknown, test: unknown): boolean;
export function which     (value: unknown, tests: unknown[]): { index: number, parts: object | null };
/** A @switch with patterns: a branch gets the parts of its case as a getter. */
export function cases     (subject: () => unknown, tests: unknown[], views: ((parts: () => object) => unknown)[], otherwise?: (() => unknown) | null): unknown;

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
