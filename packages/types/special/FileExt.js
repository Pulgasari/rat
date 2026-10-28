// @rat/types :: FileExt

/*
the extension of a file name, lowercase, without the dot. a dot file ('.env') and a name without a dot
have none (''). knows the usual mime types.

  import { FileExt } from '@rat/types/FileExt';

  const ext = FileExt.from('Beach.JPG');   // also from a Path or 'a/b/beach.jpg'

  ext.value                  // 'jpg'
  ext.mimeType               // 'image/jpeg', 'application/octet-stream' when unknown
  ext.is('jpg', 'jpeg')      // true
  String(ext)                // 'jpg'

called, it is the schema: an extension ('jpg', '.JPG') or a FileExt, made a FileExt.

  const Upload = { name: Str, ext: FileExt() };
*/

import { Schema, typed } from '../schema.js';

const MIME = {
  '7z'  : 'application/x-7z-compressed',
  aac   : 'audio/aac',
  avif  : 'image/avif',
  bmp   : 'image/bmp',
  bz2   : 'application/x-bzip2',
  css   : 'text/css',
  csv   : 'text/csv',
  doc   : 'application/msword',
  docx  : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  epub  : 'application/epub+zip',
  flac  : 'audio/flac',
  gif   : 'image/gif',
  gz    : 'application/gzip',
  heic  : 'image/heic',
  htm   : 'text/html',
  html  : 'text/html',
  ico   : 'image/vnd.microsoft.icon',
  jpeg  : 'image/jpeg',
  jpg   : 'image/jpeg',
  js    : 'text/javascript',
  json  : 'application/json',
  m4a   : 'audio/mp4',
  md    : 'text/markdown',
  mjs   : 'text/javascript',
  mkv   : 'video/x-matroska',
  mov   : 'video/quicktime',
  mp3   : 'audio/mpeg',
  mp4   : 'video/mp4',
  odp   : 'application/vnd.oasis.opendocument.presentation',
  ods   : 'application/vnd.oasis.opendocument.spreadsheet',
  odt   : 'application/vnd.oasis.opendocument.text',
  oga   : 'audio/ogg',
  ogg   : 'audio/ogg',
  ogv   : 'video/ogg',
  opus  : 'audio/opus',
  pdf   : 'application/pdf',
  png   : 'image/png',
  ppt   : 'application/vnd.ms-powerpoint',
  pptx  : 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  rar   : 'application/vnd.rar',
  rtf   : 'application/rtf',
  svg   : 'image/svg+xml',
  tar   : 'application/x-tar',
  tif   : 'image/tiff',
  tiff  : 'image/tiff',
  txt   : 'text/plain',
  wav   : 'audio/wav',
  weba  : 'audio/webm',
  webm  : 'video/webm',
  webp  : 'image/webp',
  xls   : 'application/vnd.ms-excel',
  xlsx  : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  xml   : 'application/xml',
  xz    : 'application/x-xz',
  zip   : 'application/zip',
  zst   : 'application/zstd',
};

// the last name of a path, its part after the last dot, unless that dot starts the name
function extOf (value) {
  const name = String(value ?? '').split('/').at(-1);
  const dot  = name.lastIndexOf('.');
  return dot > 0 ? name.slice(dot + 1).toLowerCase() : '';
}

// ::: the data type

class FileExtType {
  constructor (value = '') {
    this.value = String(value).replace(/^\./, '').toLowerCase();
    Object.freeze(this);
  }

  static from (name) { return name instanceof FileExtType ? name : new FileExtType(extOf(name)); }

  get mimeType () { return MIME[this.value] ?? 'application/octet-stream'; }

  is (...values) { return values.some(value => String(value).replace(/^\./, '').toLowerCase() === this.value); }

  toJSON   () { return this.value; }
  toString () { return this.value; }
}

Object.defineProperty(FileExtType, 'name', { value: 'FileExt' });

// ::: the schema

const ofValue = (Type, schema, value = schema.initial) => schema.parse(value);

const FileExt = typed(FileExtType, () => new Schema({
  initial : '',
  kind    : 'fileext',
  run     : (value, path) => {
    if (value instanceof FileExtType) return { value };
    return typeof value === 'string' ? { value: new FileExtType(value) } : { issues: [{ message: 'expected an extension', path }] };
  },
}), ofValue);

// :::::: EXPORT

export { FileExt, MIME };
export default FileExt;
