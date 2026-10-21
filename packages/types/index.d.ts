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

export interface ListSchema<T> extends Schema<T[] | List<T>> {
  min (length: number): this;
  max (length: number): this;
}

export type Infer<S> = S extends Schema<infer T> ? T : never;

export const Bool : Schema<boolean>;
export const Num  : NumSchema;
export const Str  : StrSchema;


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

export interface ListConstructor {
  new <T>(items?: Iterable<T>): List<T>;
  /** The schema of a list (an array or a List) whose items match item: List(Str). */
  <T>(item: Schema<T>): ListSchema<T>;
  from<T> (items: Iterable<T>): List<T>;
  of<T>   (...items: T[]): List<T>;
}

export const List: ListConstructor;
/** A List whose reads subscribe and whose writes notify. */
export const $List: { new <T>(items?: Iterable<T>): List<T>; from<T> (items: Iterable<T>): List<T>; of<T> (...items: T[]): List<T> };

/** Holds one value out of a fixed list. */
export interface Enum<V> {
  readonly schema : Schema<V>;
  readonly values : readonly V[];
  /** Setting a value that is not one of values throws. */
  value : V;
  /** The next value (step -1: the previous), around the end. */
  cycle (step?: number): V;
  is    (value: unknown): value is V;
  toJSON (): V;
  valueOf (): V;
}

export interface EnumConstructor {
  /** Starts at the first value, at the schema's initial value, or at the value of the Enum it copies. */
  new <const V extends readonly unknown[]>(...values: V): Enum<V[number]>;
  new <V>(source: Schema<V> | Enum<V>): Enum<V>;
  /** The schema: one value out of a fixed list, the first is the initial one. */
  <const V extends readonly unknown[]>(...values: V): Schema<V[number]>;
}

export const Enum: EnumConstructor;
/** An Enum whose value and is() subscribe and whose cycle() and value = … notify. */
export const $Enum: {
  new <const V extends readonly unknown[]>(...values: V): Enum<V[number]>;
  new <V>(source: Schema<V> | Enum<V>): Enum<V>;
};
/** A Map whose reads subscribe and whose writes notify. */
export const $Map: MapConstructor;
/** A Set whose reads subscribe and whose writes notify. */
export const $Set: SetConstructor;

type Shape = { [key: string]: Schema<any> };

/** A sealed object with fixed fields; with a schema every field write is checked. */
export type Record<T extends object> = T & {
  readonly schema : Schema<T> | null;
  /** Several fields at once (one notification on a $Record). */
  assign (values: Partial<T>): Record<T>;
  toJSON (): T;
};

export interface RecordConstructor {
  /** Fields at the schema's initial values, values parsed over them. */
  new <T extends object>(schema: Schema<T>, values?: Partial<T>): Record<T>;
  /** Fixed fields without a schema, or a copy of another Record. */
  new <T extends object>(values: T | Record<T>): Record<T>;
  /** The schema: an object with known fields, unknown fields kept. */
  <S extends Shape>(shape: S): Schema<{ [K in keyof S]: Infer<S[K]> }>;
}

export const Record: RecordConstructor;
/** A Record whose field reads subscribe and whose field writes notify, one version for all fields. */
export const $Record: { new <T extends object>(schema: Schema<T>, values?: Partial<T>): Record<T>; new <T extends object>(values: T | Record<T>): Record<T> };

/** Frozen: fixed length, fixed values. */
export interface Tuple<T extends readonly unknown[]> extends Iterable<T[number]> {
  readonly [index: number]: T[number];
  readonly length: T['length'];
  at (index: number): T[number] | undefined;
  equals (other: unknown): boolean;
  /** A new tuple with one value replaced. */
  with (index: number, value: T[number]): Tuple<T>;
  toArray (): T[number][];
  toJSON (): T[number][];
}

export interface TupleConstructor {
  new <const T extends readonly unknown[]>(...items: T): Tuple<T>;
  from<T> (items: Iterable<T>): Tuple<T[]>;
  /** The schema: an array or a Tuple of exactly these items. */
  <const S extends readonly Schema<any>[]>(...items: S): Schema<{ [K in keyof S]: Infer<S[K]> }>;
}

export const Tuple: TupleConstructor;

export interface UnionSchema<T> extends Schema<T> {
  /** The name (or index) of the first case the value fits, null for none. */
  which (value: unknown): string | number | null;
}

/** One of several schemas, the first that fits wins. A schema only: a union value is a value of one of its cases. */
export function Union<const S extends readonly Schema<any>[]> (...cases: S): UnionSchema<Infer<S[number]>>;
export function Union<S extends Shape> (cases: S): UnionSchema<Infer<S[keyof S]>>;

/** Any notation: '#ff8800', 'rgb(…)', 'hsl(…)', [r, g, b, a?], { r, g, b, a? }, { h, s, l, a? }, a Color. */
export type ColorInput = string | readonly number[] | { r: number, g: number, b: number, a?: number } | { h: number, s: number, l: number, a?: number } | Color;

/** One color, read and written in rgb (0-255), hsl (0-360, 0-100), alpha (0-1) or hex. */
export interface Color {
  r : number; g : number; b : number; a : number;
  h : number; s : number; l : number;
  hex : string;
  set (input: ColorInput): this;
  /** A new color, amount of the way to other. */
  mix (other: ColorInput, amount?: number): Color;
  equals (other: ColorInput): boolean;
  toArray (): [number, number, number, number];
  toHsl (): [number, number, number, number];
  toJSON (): string;
  toString (): string;
}

export interface ColorConstructor {
  new (input?: ColorInput): Color;
  /** The schema: anything that reads as a color. */
  (): Schema<ColorInput>;
}

export const Color: ColorConstructor;
/** A Color whose reads subscribe and whose writes notify. */
export const $Color: { new (input?: ColorInput): Color };

// :::::: Id, Ref

export interface IdSchema extends Schema<string | number | null> {
  /** Keys counting up (1, 2, 3 …) instead of uuids. */
  readonly counter: IdSchema;
  /** A new key: a uuid, or for a counter the one after the largest of keys. */
  make (keys?: Array<string | number>): string | number;
}

/** The primary key of a record. Missing on a write, the table makes one. */
export declare const Id: IdSchema;
/** The key of a record in another table. */
export declare function Ref (table: string): Schema<string | number>;

// :::::: choice

/** A test of choice: a schema, a typeof constructor, a class, a predicate, a RegExp, a pattern object or tuple, a literal. */
export type Test = unknown;

export interface Choice {
  /** Pairs of test and handler, the first match wins, a function alone at the end is the fallback. */
  <R = unknown> (...cases: Array<[Test, ((value: any) => R) | R] | ((value: any) => R)>): (value: unknown) => R | undefined;
  /** A single test. */
  matches (test: Test, value: unknown): boolean;
}

export declare const choice: Choice;

