// scratchfile

/*
ich spiele mit dem gedanken weitere data types zu erstellen.
teilweise "standards" für den core (zb Segments)
teilweise speziellere die dann als einzelfiles in unterordner liegen und einzelen importiert werden

import FileExt from '@rat/types/FileExt';
import Path    from '@rat/types/Path';
*/

/*
Path
Segments
FileExt
MimeType
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

/*
just some syntax ideas:

get asArray  () { return Array.from(this.#segments); }
get asList   () { return  List.from(this.#segments); }
get asString () { return this.segments.join(this.#separator); }

get asArray  ==> Array.from :: this.#segments;
get asList   ==>  List.from :: this.#segments;
get asString ==> this.segments.join :: this.#separator;
*/
