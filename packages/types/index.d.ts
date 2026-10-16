// @rat/types

export interface Issue {
  message : string;
  path    : (string | number)[];
}

export type Result<T> = { value: T, issues?: undefined } | { issues: Issue[] };

export interface Description {
  kind : string;
  [key: string]: unknown;
}

/** A schema: checks and coerces a value, knows its initial value, describes itself. Immutable. */
export interface Schema<T> {
  readonly kind     : string;
  readonly initial  : T;
  readonly describe : Description;
  readonly '~standard': { readonly version: 1, readonly vendor: 'rat', validate (value: unknown): Result<T> };

  check    (fn: (value: T) => boolean, message?: string): this;
  default  (value: T): this;
  optional (): Schema<T | null | undefined>;

  validate (value: unknown, path?: (string | number)[]): Result<T>;
  is       (value: unknown): value is T;
  /** The checked value, or a TypeError naming every issue. */
  parse    (value: unknown): T;
}

export interface NumSchema extends Schema<number> {
  min   (min: number): this;
  max   (max: number): this;
  range (min: number, max: number): this;
  readonly int : this;
}

export interface StrSchema extends Schema<string> {
  min     (length: number): this;
  max     (length: number): this;
  pattern (regex: RegExp, message?: string): this;
  readonly email : this;
  readonly uuid  : this;
}

export interface ListSchema<T> extends Schema<T[]> {
  min (length: number): this;
  max (length: number): this;
}

export type Infer<S> = S extends Schema<infer T> ? T : never;

export const Bool : Schema<boolean>;
export const Num  : NumSchema;
export const Str  : StrSchema;

/** One value out of a fixed list, the first is the initial one. */
export function Enum<const V extends readonly unknown[]> (...values: V): Schema<V[number]>;
/** The schema of a list whose items match item: ListOf(Str). */
export function ListOf<T> (item: Schema<T>): ListSchema<T>;
export function Record<S extends Record<string, Schema<any>>> (shape: S): Schema<{ [K in keyof S]: Infer<S[K]> }>;

/** The base class, for schemas of your own. */
export const Schema: new (definition: object) => Schema<unknown>;

export function isSchema (value: unknown): value is Schema<unknown>;

/** A list: length is a getter, at(i) / set(i, v) replace [i]. $List is the same, reactive. */
export interface List<T> extends Iterable<T> {
  readonly length: number;
  at (index: number): T | undefined;
  includes (value: T): boolean;
  indexOf (value: T): number;
  every (fn: (item: T, index: number) => unknown): boolean;
  filter (fn: (item: T, index: number) => unknown): T[];
  find (fn: (item: T, index: number) => unknown): T | undefined;
  findIndex (fn: (item: T, index: number) => unknown): number;
  flatMap<U> (fn: (item: T, index: number) => U | U[]): U[];
  forEach (fn: (item: T, index: number) => void): void;
  join (separator?: string): string;
  map<U> (fn: (item: T, index: number) => U): U[];
  reduce<U> (fn: (sum: U, item: T, index: number) => U, initial: U): U;
  slice (start?: number, end?: number): T[];
  some (fn: (item: T, index: number) => unknown): boolean;
  toArray (): T[];
  push (...items: T[]): number;
  pop (): T | undefined;
  shift (): T | undefined;
  unshift (...items: T[]): number;
  splice (start: number, count?: number, ...items: T[]): T[];
  sort (fn?: (a: T, b: T) => number): this;
  reverse (): this;
  set (index: number, value: T): this;
  remove (value: T): boolean;
  replace (items: Iterable<T>): this;
  clear (): this;
}

export const List: { new <T>(items?: Iterable<T>): List<T>; from<T> (items: Iterable<T>): List<T>; of<T> (...items: T[]): List<T> };
/** A List whose reads subscribe and whose writes notify. */
export const $List: typeof List;
/** A Map whose reads subscribe and whose writes notify. */
export const $Map: MapConstructor;
/** A Set whose reads subscribe and whose writes notify. */
export const $Set: SetConstructor;
