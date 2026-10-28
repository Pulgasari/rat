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

the rest is Segments (../Segments.js): segments, length, at(), slice(), with(), equals(), toArray().
*/

import { Segments, partsOf } from '../Segments.js';
import { FileExt }           from './FileExt.js';

const known = new Map;   // 'a/b' -> its Path

class Path extends Segments {
  constructor (value = []) { super(value, '/'); }

  static from (value) {
    if (value instanceof Path) return value;
    const key = partsOf(value, '/').join('/');
    if (!known.has(key)) known.set(key, new Path(key));
    return known.get(key);
  }

  static get root () { return Path.from(''); }

  get name   () { return this.at(-1) ?? ''; }
  get parent () { return this.length ? this.slice(0, -1) : null; }
  get ext    () { return FileExt.from(this.name); }

  child (name) { return this.with(name); }
}

// :::::: EXPORT

export { Path };
export default Path;
