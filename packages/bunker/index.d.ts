// @rat/bunker

export type Key = string | number;

export interface Change { type: 'set' | 'delete' | 'clear'; keys: Key[]; }

/** Where values live. sync: get, set, delete, keys and clear answer at once instead of with promises. */
export interface Driver {
  holds  : 'string' | 'clone' | 'response';
  sync   : boolean;
  get    (key: Key): unknown;
  set    (key: Key, value: unknown): unknown;
  delete (key: Key): unknown;
  keys   (): Key[] | Promise<Key[]>;
  clear  (): unknown;
  values? (): unknown[] | Promise<unknown[]>;
  /** Changes from outside (another tab). Returns its stop. */
  watch? (fn: (change: Change) => void): () => void;
}

export interface Codec { encode (value: unknown): unknown; decode (stored: unknown): unknown; }

export type DriverName = 'cache' | 'cookie' | 'indexeddb' | 'local' | 'memory' | 'session';

export interface StoreOptions {
  driver? : DriverName | Driver;
  /** The key prefix, the database or the cache. */
  name?   : string;
  /** indexeddb: the object store. */
  table?  : string;
  /** Any standard schema, checks every value set. */
  schema? : { '~standard': { validate (value: unknown): unknown } } | null;
  codec?  : 'json' | 'text' | 'raw' | 'response' | Codec;
  [option: string]: unknown;
}

export declare class Store<V = any> {
  constructor (options?: StoreOptions);
  readonly driver : Driver;
  readonly sync   : boolean;
  readonly schema : StoreOptions['schema'];

  get (key: Key): Promise<V | undefined>;
  get<F> (key: Key, fallback: F): Promise<V | F>;
  has (key: Key): Promise<boolean>;
  keys (): Promise<Key[]>;
  values (): Promise<V[]>;
  entries (): Promise<[Key, V][]>;
  set (key: Key, value: V): Promise<V>;
  delete (key: Key): Promise<void>;
  clear (): Promise<void>;

  /** A sync driver only. */
  getSync (key: Key, fallback?: unknown): V | undefined;
  setSync (key: Key, value: V): V;
  deleteSync (key: Key): void;
  keysSync (): Key[];

  /** The value through the schema, or a TypeError. */
  check (value: unknown): V;
  on (type: 'change', fn: (change: Change) => void): () => void;
  emit (change: Change): void;

  /** The content in a form: Array, Object, Map, 'keys', 'values', 'entries', List (a promise), $List (live). */
  as (Type: unknown): any;
  /** A $List of the values that follows the store, one per store. */
  readonly $items: any;
}

export declare function createStore<V = any> (options?: StoreOptions): Store<V>;

export type Field = { '~standard': unknown } | StringConstructor | NumberConstructor | BooleanConstructor | typeof URL | ObjectConstructor | ArrayConstructor;

export declare class Table<R extends Record<string, any> = Record<string, any>> extends Store<R> {
  readonly name : string;
  /** The field that is the key. */
  readonly key  : string;
  /** A new record, its key made when it has none. */
  add (record: Partial<R>): Promise<R>;
  put (record: Partial<R>): Promise<R>;
  update (key: Key, patch: Partial<R>): Promise<R>;
  find (test: ((record: R) => boolean) | Partial<R>): Promise<R[]>;
  count (): Promise<number>;
}

export interface DatabaseOptions {
  name?   : string;
  driver? : DriverName | Driver;
  /** table -> its fields. */
  schema? : Record<string, Record<string, Field> | null>;
}

export declare class Database {
  constructor (options?: DatabaseOptions);
  readonly name   : string;
  /** The names of the tables. */
  readonly tables : string[];
  table (name: string): Table;
  [table: string]: Table | unknown;
}

export declare function createDatabase (options?: DatabaseOptions): Database;

export declare class Entry {
  readonly files  : Files;
  readonly handle : FileSystemHandle;
  readonly kind   : 'file' | 'folder';
  readonly name   : string;
  readonly path   : string;
  info (): Promise<{ size: number, modified: number, type: string } | null>;
  read (as?: 'text' | 'json' | 'blob' | 'bytes'): Promise<any>;
  write (data: string | Blob | ArrayBuffer | ArrayBufferView | unknown): Promise<this>;
  list (): Promise<Entry[]>;
  remove (): Promise<void>;
  /** Never asks. */
  permission (mode?: 'read' | 'readwrite'): Promise<'granted' | 'prompt' | 'denied'>;
  /** Asks, inside a click. */
  request (mode?: 'read' | 'readwrite'): Promise<'granted' | 'prompt' | 'denied'>;
}

export interface TreeNode { entry: Entry; children: TreeNode[] | null; }

export declare class Files {
  constructor (options?: { driver?: 'opfs', root?: FileSystemDirectoryHandle | null });
  /** A folder the user grants, inside a click. null when cancelled. */
  static pick (options?: { id?: string, mode?: 'read' | 'readwrite', startIn?: string }): Promise<Files | null>;
  root (): Promise<Entry>;
  entry (path: string): Promise<Entry | null>;
  exists (path: string): Promise<boolean>;
  list (path?: string): Promise<Entry[]>;
  tree (path?: string, options?: { accept?: (name: string) => boolean }): Promise<TreeNode>;
  read (path: string, as?: 'text' | 'json' | 'blob' | 'bytes'): Promise<any>;
  write (path: string, data: unknown): Promise<Entry>;
  mkdir (path: string): Promise<Entry>;
  remove (path: string): Promise<void>;
  on (type: 'change', fn: (change: { type: 'write' | 'remove', paths: string[] }) => void): () => void;
}

export declare function createFiles (options?: { driver?: 'opfs', root?: FileSystemDirectoryHandle | null }): Files;

export interface Memo<V = any> {
  readonly store: Store<{ at: number, value: V }>;
  /** Fresh from the store, else loaded with loader (without one: undefined). */
  get (key: Key, loader?: () => V | Promise<V>): Promise<V | undefined>;
  delete (key: Key): Promise<void>;
  clear (): Promise<void>;
}

export declare function memo<V = any> (store: Store, options?: { ttl?: number, stale?: boolean }): Memo<V>;

export declare function cast (Type: unknown, store: Store): any;
export declare function register (Type: unknown, make: (store: Store) => unknown): void;

export declare const codecs  : Record<'json' | 'text' | 'raw' | 'response', Codec>;
export declare const drivers : Record<DriverName, (options?: Record<string, unknown>) => Driver>;
