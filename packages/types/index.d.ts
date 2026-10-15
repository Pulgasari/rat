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
export function List<T>   (item: Schema<T>): ListSchema<T>;
export function Record<S extends Record<string, Schema<any>>> (shape: S): Schema<{ [K in keyof S]: Infer<S[K]> }>;

/** The base class, for schemas of your own. */
export const Schema: new (definition: object) => Schema<unknown>;

export function isSchema (value: unknown): value is Schema<unknown>;
