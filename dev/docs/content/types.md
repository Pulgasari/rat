# Types

The data types of `@rat/types`. Each is a class and, called, its schema:

```js
const tags = new List(['a', 'b']);   // a value
const Tags = List(Str);              // a schema
Tags.create(['a']);                  // a value made from the schema
```

Every type has a reactive variant with `$`: reads subscribe, writes notify. A `$name` in a `.rat` file holding an `Array`, `Map`, `Set` or one of these gets its variant by itself.

| | |
|---|---|
| values | [Color](#color) · [Segments](#segments) · [Path](#path) · [FileExt](#fileext) · [Tuple](#tuple) |
| containers | [Enum](#enum) · [List](#list) · [Record](#record) · [Dict](#dict) · [Table](#table) |
| reactive only | [$Array, $Map, $Set](#array-map-set) · [$Bool, $Num, $Str](#bool-num-str) |

A **value** is its schema's result: `Record({ accent: Color }).parse(…).accent` is a `Color`. A **container** holds values: its schema gives plain data, `create()` the container.

## Enum

One value out of a fixed list.

```js
const view = new Enum('grid', 'list', 'masonry');

view.value;             // 'grid'
view.cycle();           // 'list'
view.cycle(-1);         // 'grid', backwards
view.is('grid');        // true
view.value = 'table';   // TypeError: one of grid, list, masonry
```

```ratjs
const $sort = new $Enum('newest', 'oldest', 'alpha');
```

## List

A list of its own (not an Array subclass): `length`, `at(i)`, `set(i, value)`.

```js
const tags = new List(['b', 'a']);
tags.push('c');
tags.sort().at(-1);         // 'c'
tags.toggle('a');           // false: it was there, now it is gone
tags.toArray();             // ['b', 'c']

const tracks = new List([{ title: 'x', album: 1, track: 2 }, { title: 'y', album: 1, track: 1 }]);
tracks.where({ album: 1 }).toSortedBy('track').pluck('title');   // List ['y', 'x']
```

Made from a schema, a list checks what comes in. An item that is a data type becomes one:

```ratjs
const Tab   = $Record({ path: Path, source: Str.optional().default(null) });
const $tabs = $List(Tab).create([{}]);

$tabs.push({ path: 'photos' });   // a $Record, path a Path
$tabs.push({ path: 42 });         // TypeError: path: expected a path
```

Query methods: `where`, `without`, `one`, `has`, `pluck`, `keyBy`, `sortBy` / `toSortedBy`, `drop`, `toggle`.

## Record

A sealed object with fixed fields; with a schema every field write is checked.

```js
const Settings = Record({ view: Enum('grid', 'list'), zoom: Num.range(50, 200).default(100) });

const settings = Settings.create({ zoom: 120 });   // or new Record(Settings, { zoom: 120 })
settings.zoom = 150;
settings.zoom = 'big';                             // TypeError: expected a number
settings.size = 3;                                 // TypeError: no such field
settings.assign({ view: 'list', zoom: 80 });

const point = new Record({ x: 0, y: 0 });          // no schema: fixed fields, any value
```

```ratjs
export const $settings! = $Record(Settings).create();   // reactive and kept
```

## Dict

A `Map` whose keys and values follow a schema each. Entries read as properties too.

```js
const Commands = Dict(Str.to(KebabCase), { exec: Fn, '?title': Str });
const commands = Commands.create();

commands.set('togglePlay', { exec: play });   // key: 'toggle-play'
commands.get('Toggle Play').exec();           // a key is read through the key schema
commands.togglePlay;                          // = get('togglePlay')
```

## Table

A list of rows that all follow one record: frozen objects with exactly these columns.

```js
const todos = Table({ title: Str, done: Bool }).create([{ title: 'milk' }]);

todos.push({ title: 'eggs', done: 'yes' });   // done: true
todos.update(0, { done: true });              // a row changes through the table
todos.column('title');                        // ['milk', 'eggs']
todos.where({ done: false });
```

A `$Table` kept with `$name!` goes to the app's database.

## Tuple

A fixed number of values, frozen.

```js
const entry = new Tuple('rat', 3);
const [name, count] = entry;
entry.with(1, 4);                   // a new tuple
Tuple(Str, Num).parse(['a', '1']);  // Tuple('a', 1)
```

## Color

One color in any notation.

```js
const accent = new Color('#ff8800');   // 'rgb(…)', 'hsl(…)', [r, g, b], { r, g, b }, { h, s, l }

accent.l = 70;            // lighter, r g b follow
accent.a = 0.5;
accent.hex;               // '#ffb86680'
accent.mix('#000');       // a new color, halfway to black
String(accent);           // the hex, JSON too
```

## Segments

A value of parts with a separator: a key like `rat:noisy:theme`, a version.

```js
const key = Segments.from('rat:noisy:theme');

key.at(-1);              // 'theme'
key.slice(0, 2);         // rat:noisy
key.with('dark');        // rat:noisy:theme:dark
key.startsWith('rat');   // true, part by part
Segments.from('1.4.2', '.').toArray();
```

## Path

Segments with `/`, one instance per path: `===` compares two.

```js
import { Path } from '@rat/types/Path';

const path = Path.from('photos/2024/beach.jpg');
path.name;           // 'beach.jpg'
path.parent;         // photos/2024
path.child('raw');
path.ext;            // FileExt jpg
path === Path.from(['photos', '2024', 'beach.jpg']);   // true
```

## FileExt

```js
import { FileExt } from '@rat/types/FileExt';

const ext = FileExt.from('Beach.JPG');
ext.value;              // 'jpg'
ext.mimeType;           // 'image/jpeg'
ext.is('jpg', 'jpeg');  // true
```

## $Array, $Map, $Set

The js collections, reactive. A `$name` holding one gets it by itself:

```ratjs
let $todos = [];
$todos.push({ title: 'milk' });   // whatever read $todos updates
$todos[0].done = true;            // not seen: the item is plain, replace it or use a $Record
```

## $Bool, $Num, $Str

A plain value as an object with methods:

```js
const $open = new $Bool;  $open.toggle();
const $zoom = new $Num(Num.range(50, 200).default(100));  $zoom.inc(10);   // stops at 200
const $query = new $Str('');  $query.clear();
```
