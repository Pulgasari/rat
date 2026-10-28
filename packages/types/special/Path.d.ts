import type { Segments } from '../index.d.ts';
import type { FileExt }  from './FileExt.d.ts';

/** A path of names below a root, '/' between them. One instance per path: === compares. */
export declare class Path extends Segments {
  static from (value: string | readonly string[] | Segments): Path;
  static readonly root: Path;
  /** The last name, '' for the root. */
  readonly name   : string;
  readonly parent : Path | null;
  readonly ext    : FileExt;
  child (name: string): Path;
}

export default Path;
