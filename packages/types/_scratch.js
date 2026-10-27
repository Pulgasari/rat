// scratchfile

/*
ich spiele mit dem gedanken weitere data types zu erstellen.
teilweise "standards" für den core (zb Segments)
teilweise "special" die dann als einzelfiles in unterordner liegen und einzelen importiert werden

import FileExt from '@rat/types/FileExt';
import Path    from '@rat/types/Path';

::: core | basic
Segments

::: special
FileExt
MimeType
Path

::: notiz
Segments wäre zb für so zusammengesetzte keys gut wie `rat:noisy:theme`
*/

const ext  = FileExt.from (path);
const mime = ext.mimeType;

const mime = MimeType.from(path).toString();



class Segments extends List {
  #items     = [];
  #separator = '';
}

class Path extends Segments {
  #segments  = [];
  #separator = '/';

  asArray  () { return Array.from(this.#segments); }
  asList   () { return  List.from(this.#segments); }
  asString () { return this.join(); }

  join (sep) { return this.segments.join(sep || this.#separator);
}

class List {
  ...
  asRegExp () { return /^(zip|rar|7z|tar|gz|bz2|xz|zst)$/; }
}

/*
just some syntax ideas:

get asArray  () { return Array.from(this.#segments); }
get asList   () { return  List.from(this.#segments); }
get asString () { return this.segments.join(this.#separator); }

get asArray  ==> Array.from :: this.#segments;
get asList   ==>  List.from :: this.#segments;
get asString ==> this.segments.join :: this.#separator;
*/
