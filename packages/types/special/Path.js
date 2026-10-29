// @rat/types :: Path

/*
a path of names below a root, separated by '/': Segments with names for what a path is asked. one
instance per path: Path.from('a/b') is always the same object, so === compares two paths, and a
computed of a path only reports a real change.

  import { Path } from '@rat/types/Path';

  const path = Path.from('photos/2024/beach.jpg');   // or from ['photos', '2024', 'beach.jpg']

  path.name                 // 'beach.jpg', '' for the root
  path.parent               // photos/2024, null for the root
  path.child('raw')         // photos/2024/beach.jpg/raw
  path.ext                  // FileExt jpg (special/FileExt.js)
  path.startsWith('photos') // true
  path === Path.from(['photos', '2024', 'beach.jpg'])   // true
  String(path)              // 'photos/2024/beach.jpg', no leading slash. JSON as well
  Path.root                 // the root, ''

called, it is the schema: a string, the names or a Path, made a Path. as a field it stands for its
schema without the call, so a Record or a Table field holds a Path and stores it as 'a/b':

  const Bookmark = { name: Str, path: Path };   // the same as path: Path()

the rest is Segments (../Segments.js): segments, length, at(), slice(), with(), equals(), toArray().
*/

import { Schema, bare, byParse, issue, typed } from '../schema.js';
import { Segments, isInput, partsOf }          from '../Segments.js';
import { FileExt }                             from './FileExt.js';

const known = new Map;   // 'a/b' -> its Path

// ::: DATA TYPE

class PathType extends Segments {
  constructor (value = []) { super(value, '/'); }

  static from (value) {
    if (value instanceof PathType) return value;
    const key = partsOf(value, '/').join('/');
    if (!known.has(key)) known.set(key, new PathType(key));
    return known.get(key);
  }

  static get root () { return PathType.from(''); }

  get name   () { return this.at(-1) ?? ''; }
  get parent () { return this.length ? this.slice(0, -1) : null; }
  get ext    () { return FileExt.from(this.name); }

  child (name) { return this.with(name); }
}

// ::: SCHEMA

const pathOf = () => new Schema({
  initial : '',
  kind    : 'path',
  run     : (value, path) => isInput(value) ? { value: PathType.from(value) } : issue('expected a path', path),
});

// ::: Path

const Path = bare(typed(PathType, pathOf, { kind: 'path', make: byParse, name: 'Path' }));

// :::::: EXPORT

export { Path };
export default Path;
