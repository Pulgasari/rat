import type { TypedSchema } from '../index.d.ts';

/** The extension of a file name, lowercase, without the dot. '' for none. */
export interface FileExt {
  readonly value    : string;
  /** 'application/octet-stream' when unknown. */
  readonly mimeType : string;
  is (...values: string[]): boolean;
  toJSON (): string;
  toString (): string;
}

export interface FileExtConstructor {
  new (value?: string): FileExt;
  /** The schema: an extension ('jpg', '.JPG') or a FileExt, made a FileExt. */
  (): TypedSchema<FileExt, FileExt>;
  /** The extension of a file name or path. */
  from (name: string | { toString (): string } | FileExt): FileExt;
}

export const FileExt: FileExtConstructor;
export declare const MIME: Record<string, string>;
export default FileExt;
