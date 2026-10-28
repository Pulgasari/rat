/** The extension of a file name, lowercase, without the dot. '' for none. */
export declare class FileExt {
  constructor (value?: string);
  static from (name: string | { toString (): string } | FileExt): FileExt;
  readonly value    : string;
  /** 'application/octet-stream' when unknown. */
  readonly mimeType : string;
  is (...values: string[]): boolean;
  toJSON (): string;
  toString (): string;
}

export declare const MIME: Record<string, string>;

export default FileExt;
