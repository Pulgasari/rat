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

  /** A value in this schema's form, through its transform (a case of Str): KebabCase.from('togglePlay'). */
  from (value: unknown): T;
  /** This schema's check, then made into target and checked by it: Str.to(KebabCase). */
  to<U> (target: Schema<U>): Schema<U>;

  /** A value of the data type this schema was made by. A schema of plain js values (Str, Num …) throws. Kept after stored(). */
  create (value?: unknown): unknown;

  /** Kept beyond the page: $() makes a kept signal of it, create() a kept variant. See stored(). */
  stored (options?: string | StoredOptions): this;
}

export type { Place, StoredOptions } from '@rat/signals';
export { stored } from '@rat/signals';
import type { StoredOptions } from '@rat/signals';

/** The schema of a data type: create() makes a value of it, $Dict(…).create() a reactive one. */
export interface TypedSchema<T, I> extends Schema<T> {
  create (value?: unknown): I;
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
  /** A case of writing: only a string transform leaves as it is passes, from() makes one. regex describes it. */
  case (spec: { regex?: RegExp | null, transform: (value: string) => string }): StrSchema;
}

/** The schema of an array: [Str], Array(Str), or $Array(Str) for more (min, max, create). */
export interface ArraySchema<T> extends Schema<T[]> {
  min (length: number): this;
  max (length: number): this;
  /** A $Array that keeps to this schema: what comes in goes through the schema of an item. Only on $Array(…). */
  create (items?: Iterable<unknown>): T[];
}

export type Infer<S> = S extends Schema<infer T> ? T : never;

export const Bool : Schema<boolean>;
export const Num  : NumSchema;
export const Str  : StrSchema;

export const CamelCase    : StrSchema;
export const ConstantCase : StrSchema;
export const KebabCase    : StrSchema;
export const LowerCase    : StrSchema;
export const MockingCase  : StrSchema;
export const PascalCase   : StrSchema;
export const SnakeCase    : StrSchema;
export const TitleCase    : StrSchema;
export const UpperCase    : StrSchema;

/** A function, nothing coerced. */
export const Fn : Schema<(...args: any[]) => unknown>;

/** A Map whose keys and values follow a schema each; get, has and delete read a key through the key schema. */
export interface Dict<K, V> extends Map<K, V> {
  readonly schema : Schema<Map<K, V>>;
  /** The key as the key schema makes it, or undefined. */
  keyOf (key: unknown): K | undefined;
  toJSON (): Record<string, V>;
}

export interface DictConstructor {
  new <K, V>(schema: Schema<Map<K, V>>, entries?: Iterable<[unknown, unknown]> | Record<string, unknown>): Dict<K, V>;
  new <K, V>(other: Dict<K, V>): Dict<K, V>;
  /** The schema: keys of key, values of value (a schema, or fields for a Record). */
  <K, V>(key: Schema<K>, value: Schema<V> | Record<string, Schema<any>>): TypedSchema<Map<K, V>, Dict<K, V>>;
}

export const Dict  : DictConstructor;
/** A Dict whose reads subscribe and whose writes notify. Called, the schema whose create() makes one. */
export const $Dict : DictConstructor;


/** The base class, for schemas of your own. */
export const Schema: new (definition: object) => Schema<unknown>;

export function isSchema (value: unknown): value is Schema<unknown>;
/** Marks a type whose schema takes nothing (Color, Path …): where a schema is asked, the type stands for it. */
export function bare<T extends Function> (Type: T): T;
/** A bare type as its schema (Path -> Path()), anything else as it is. [Str] as the schema of an array of it. Records, arrays, dicts, tuples and unions ask it for their parts. */
export function schemaOf<T> (value: T): T extends () => infer S ? S : T;

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
  <const V extends readonly unknown[]>(...values: V): TypedSchema<V[number], Enum<V[number]>>;
}

export const Enum: EnumConstructor;
/** An Enum whose value and is() subscribe and whose cycle() and value = … notify. Called, the schema whose create() makes one. */
export const $Enum: EnumConstructor;
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
  <S extends Shape>(shape: S): TypedSchema<{ [K in keyof S]: Infer<S[K]> }, Record<{ [K in keyof S]: Infer<S[K]> }>>;
}

export const Record: RecordConstructor;
/** A Record whose field reads subscribe and whose field writes notify, one version for all fields. Called, the schema whose create() makes one. */
export const $Record: RecordConstructor;

/** A value with a schema, like $Enum: reads subscribe, writes are checked by the schema and notify. */
export interface Scalar<T> {
  readonly schema : Schema<T>;
  value : T;
  toJSON (): T;
  toString (): string;
  valueOf (): T;
}

export interface $Bool extends Scalar<boolean> { off (): boolean; on (): boolean; toggle (): boolean; }
/** inc and dec stop at the bounds of the schema. */
export interface $Num  extends Scalar<number>  { dec (step?: number): number; inc (step?: number): number; }
export interface $Str  extends Scalar<string>  { clear (): string; }

type ScalarConstructor<S, T> = { new (value?: T, schema?: Schema<T>): S; new (schema: Schema<T>): S };

export const $Bool: ScalarConstructor<$Bool, boolean>;
export const $Num : ScalarConstructor<$Num, number>;
export const $Str : ScalarConstructor<$Str, string>;

/** What a $Table has besides an array: its schema, its columns, a column, a row patched. A row is frozen. */
export interface TableMembers<T extends object> {
  readonly schema  : Schema<T[]>;
  readonly columns : (keyof T)[];
  column<K extends keyof T> (key: K): T[K][];
  /** The row at index with patch over it, checked. */
  update (index: number, patch: Partial<T>): this;
}

export type TableRows<T extends object> = Readonly<T>[] & TableMembers<T>;

type RowOf<S extends Shape> = { [K in keyof S]: Infer<S[K]> };

/** The schema of a table: rows of these fields, or of a Record schema. A table that is no $Table is a plain array of rows. */
export declare function Table<S extends Shape> (shape: S | Schema<RowOf<S>>): Schema<RowOf<S>[]>;

/** A reactive array of rows that follow one record schema, every row that comes in is checked. Called, the schema whose create() makes one. */
export declare const $Table: {
  new <T extends object>(schema: Schema<T[]> | Schema<T>, rows?: Iterable<Partial<T>>): TableRows<T>;
  <S extends Shape>(shape: S | Schema<RowOf<S>>): TypedSchema<RowOf<S>[], TableRows<RowOf<S>>>;
};

/**
 * new $Array(items): a plain array whose reads (index, length, methods) subscribe and whose writes notify, Array.isArray stays true.
 * $Array(Str): the schema of an array, its create() a $Array that keeps to it (array.schema).
 */
export declare const $Array: {
  new <T>(items?: Iterable<T>): T[];
  new <T>(schema: ArraySchema<T>, items?: Iterable<unknown>): T[] & { readonly schema: ArraySchema<T> };
  <T>(item: Schema<T> | ArraySchema<T>): ArraySchema<T>;
};

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
  /** The schema: an array or a Tuple of exactly these items, made a Tuple. */
  <const S extends readonly Schema<any>[]>(...items: S): TypedSchema<Tuple<{ [K in keyof S]: Infer<S[K]> }>, Tuple<{ [K in keyof S]: Infer<S[K]> }>>;
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
  (): TypedSchema<Color, Color>;
}

export const Color: ColorConstructor;
/** A Color whose reads subscribe and whose writes notify. Called, the schema whose create() makes one. */
export const $Color: ColorConstructor;

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

// :::::: match

/** A schema, a typeof constructor, a class, a predicate, a RegExp, an object or a tuple of tests, any, a part, either, a pattern, a literal. */
export type Test = unknown;

/** The result of an arm: a function gets the value the test let through and the parts it bound. */
export type Arm<R = unknown> = [Test, ((value: any, parts: Record<string, any>) => R) | R];

export declare const NONE: unique symbol;
/** Anything. */
export declare const any: Readonly<object>;

/** The first arm whose test matches gives the result, else otherwise. */
export declare function match<R = unknown> (value: unknown, arms: Arm<R>[], otherwise?: ((value: any) => R) | R): R | undefined;
export declare function is (value: unknown, test: Test): boolean;

/** The comparator of sortBy, for a sort of your own: items.toSorted(by('year', 'desc')). Strings naturally, nullish last. */
export declare function by<T = any> (...order: ArrayOrder<T>): (a: T, b: T) => number;
/** The value the test lets through (as a schema made it), or NONE. */
export declare function pass (value: unknown, test: Test): unknown;
export declare function which (value: unknown, tests: Test[]): { index: number, parts: Record<string, any> | null };

/** The first test that matches. */
export declare function either (...tests: Test[]): Test;
/** Anything (or what test lets through), handed out as the part name. */
export declare function part (name: string, test?: Test): Test;
/** A named case: test, then guard. */
export declare function pattern (test: Test, guard?: ((value: any, parts: Record<string, any>) => boolean) | null): Test;
/** The end of a tuple: at least as many items, the rest handed out as name. */
export declare function rest (name?: string | null): Test;

export type SegmentsInput = string | readonly string[] | Segments;

/** Parts with a separator: 'rat:noisy:theme'. A value, a change gives a new one. Empty parts are dropped. */
export interface Segments extends Iterable<string> {
  readonly segments  : readonly string[];
  readonly separator : string;
  readonly length    : number;
  at (index: number): string | undefined;
  slice (start?: number, end?: number): this;
  with (...parts: SegmentsInput[]): this;
  equals (other: SegmentsInput): boolean;
  /** other is the beginning of this one, part by part. */
  startsWith (other: SegmentsInput): boolean;
  toArray (): string[];
  toJSON (): string;
  toString (): string;
}

export interface SegmentsConstructor {
  new (value?: SegmentsInput, separator?: string): Segments;
  /** The schema: a string, the parts or Segments, made Segments with separator (':' by default). */
  (separator?: string): TypedSchema<Segments, Segments>;
  from (value: SegmentsInput, separator?: string): Segments;
}

export const Segments: SegmentsConstructor;

/** What where, exclude, first, has, all, purge and toggle take: a value, an object of tests per key, a function, a RegExp, a schema, a class (match.js). */
export type ArrayTest<T> = unknown | ((item: T) => boolean);

/** A key of an item, or a function of it. */
export type ArrayKey<T> = keyof T | string | ((item: T) => unknown);

/** The order sortBy takes: 'title' · 'title', 'desc' · 'artist', 'album', 'desc', 'track' · ['author', 'title'] · { year: 'desc', title: 'asc' } · item => … */
export type ArrayOrder<T> = (ArrayKey<T> | 'asc' | 'desc')[] | [ArrayKey<T>[]] | [{ [key: string]: 'asc' | 'desc' }];

declare global {
  interface Array<T> {
    /** The items that match. */
    where (test: ArrayTest<T>): T[];
    /** The items where at least one key of criteria matches. */
    whereSome (criteria: Record<string, unknown>): T[];
    /** The items that do not match. */
    exclude (test: ArrayTest<T>): T[];
    /** The second name of exclude, for now. */
    without (test: ArrayTest<T>): T[];
    /** The first that matches, without a test the first item. */
    first (test?: ArrayTest<T>): T | undefined;
    /** Is there one that matches. */
    has (test: ArrayTest<T>): boolean;
    /** Do all match. */
    all (test: ArrayTest<T>): boolean;
    /** The value of key of every item. */
    pluck<K extends keyof T> (key: K): T[K][];
    pluck<U> (key: (item: T) => U): U[];
    /** { [value of key]: item }, a later item wins. */
    keyBy (key: ArrayKey<T>): Record<string, T>;
    /** { [value of key]: [items] }. */
    groupBy (key: ArrayKey<T>): Record<string, T[]>;
    /** The first of each value of key, without a key the first of each item. */
    uniqueBy (key?: ArrayKey<T>): T[];
    /** Case aside, in the given keys, else in the item or all its values. An empty query finds all. */
    search (query: string, keys?: ArrayKey<T>[]): T[];
    /** Sorts in place, as sort(). */
    sortBy (...order: ArrayOrder<T>): this;
    /** A sorted copy, as toSorted(). */
    toSortedBy (...order: ArrayOrder<T>): T[];
    /** Swaps two items in place, a negative index counts from the end. */
    swap (a: number, b: number): this;
    /** The items that match go, in place. */
    purge (test: ArrayTest<T>): this;
    /** The second name of purge, for now. */
    drop (test: ArrayTest<T>): this;
    /** This one item goes (by identity). True if it was there. */
    remove (value: T): boolean;
    /** Other items in the same array. */
    replace (items: Iterable<T>): this;
    /** Empties the array. */
    clear (): this;
    /** Out if it is in (by the test, else by identity), else in. True if it is in afterwards. */
    toggle (value: T, test?: ArrayTest<T>): boolean;
  }
}
