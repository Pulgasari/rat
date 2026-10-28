import type { Segments, SegmentsInput, TypedSchema } from '../index.d.ts';
import type { FileExt }                              from './FileExt.d.ts';

/** A path of names below a root, '/' between them. One instance per path: === compares. */
export interface Path extends Segments {
  /** The last name, '' for the root. */
  readonly name   : string;
  readonly parent : Path | null;
  readonly ext    : FileExt;
  child (name: string): Path;
}

export interface PathConstructor {
  new (value?: SegmentsInput): Path;
  /** The schema: a string, the names or a Path, made a Path. Stored as 'a/b'. */
  (): TypedSchema<Path, Path>;
  from (value: SegmentsInput): Path;
  readonly root: Path;
}

export const Path: PathConstructor;
export default Path;
