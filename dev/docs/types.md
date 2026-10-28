# Types

types and schemas sit in the `@rat/types` package.

## overview

### Data Types
[Color](#color) ·
[Dict](#dict) ·
[Enum](#enum) ·
[List](#list) ·
[Point](#point) ·
[Segments](#segments) ·
[Str](#str) ·
[Tree](#tree) ·
[Union](#union)

### Data Types (reactive)
[$Array](#) ·
[$Bool](#) ·
[$Color](#) ·
[$Dict](#) ·
[$Enum](#) ·
[$Map](#) ·
[$List](#list) ·
[$Point](#point) ·
[$Set](#) ·
[$Tree](#)

### Special
[Color](#color) ·
[FileExt](#fileext) ·
[Path](#path)

#### Case Types
[CamelCase](#camelcase) ·
[ConstantCase](#constantcase) ·
[KebabCase](#kebabcase) ·
[MockingCase](#mockingcase) ·
[PascalCase](#pascalcase) ·
[SnakeCase](#snakecase) ·
[TitleCase](#titlecase)

---

# Basic DataTypes

## Bool

## Enum

holds one value out of a fixed list.

```js
const viewmode = new Enum('grid', 'list', 'masonry');

viewmode.value;            // 'grid'
viewmode.cycle();          // 'list'
viewmode.cycle();          // 'masonry'
viewmode.cycle();          // 'grid'
viewmode.cycle(-1);        // 'masonry', backwards
viewmode.is('masonry');    // true
viewmode.value = 'list';   // fine
viewmode.value = 'table';  // TypeError: one of grid, list, masonry
viewmode.values;           // ['grid', 'list', 'masonry']
```

`new Enum(View)` starts from a schema (`View = Enum('grid', 'list').default('list')` starts at `'list'`), `new Enum(other)` copies another one at its value.

## List

a list that is a class of its own, not an Array subclass: `length` is a getter, `at(i)` and `set(i, value)` replace `[i]` (index access would need a proxy). `map`, `filter`, `slice` … return plain arrays.

flat array-like sequence of unique values of the same type. optionally auto-sorted.

```js
const tags = new List(['a', 'b']);
tags.push('c');
tags.at(-1);      // 'c'
tags.length;      // 3
```

## Point

## Record

a sealed object with fixed fields. with a schema, every field write is checked.

```js
const Settings = Record({ view: Enum('grid', 'list'), zoom: Num.range(50, 200).default(100) });

const settings = new Record(Settings);                  // { view: 'grid', zoom: 100 }
const custom   = new Record(Settings, { zoom: 120 });   // the rest at its initial value
const point    = new Record({ x: 0, y: 0 });            // no schema: fixed fields, any value

settings.zoom = 150;                           // fine
settings.zoom = 'big';                         // TypeError: expected a number
settings.size = 3;                             // TypeError: sealed, no such field
settings.assign({ view: 'list', zoom: 80 });   // several at once
JSON.stringify(settings);                      // '{"view":"list","zoom":80}'
```

a field may be called anything but `assign`, `schema` and `toJSON`.

`?` before a field's name makes it optional, short for `.optional()`: `Record({ exec: Fn, '?title': Str })` is `Record({ exec: Fn, title: Str.optional() })`.

# Segments

## Str

Str is the schema of a string, and the cases of writing one:

```js
Str.min(3).max(40)
Str.pattern(/^#/, 'a hex color')
Str.email, Str.uuid
```

a case only lets through a string already written that way. from() makes one of any string, Str.to(Case) is the schema that does that on the way in:

```js
KebabCase.is('toggle-play');             // true
KebabCase.is('togglePlay');              // false
KebabCase.from('togglePlay');            // 'toggle-play'
Str.to(KebabCase).parse('togglePlay');   // 'toggle-play'
KebabCase.describe.regex;                // the pattern, at hand
```

a case of your own: Str.case({ regex, transform }). transform decides: what it leaves as it is is in the case, the regex only describes it.

## Table

a `List` whose rows all follow one record schema: the same keys, other values. a row is a plain frozen object with exactly the columns (a field the schema does not know is dropped), its position is its key.

```js
const Todos = Table({ title: Str, done: Bool });       // or Table(Record({ … }))

const todos = new Table(Todos, [{ title: 'milk' }]);   // a missing field gets its initial value
todos.push({ title: 'eggs', done: 'yes' });            // checked and coerced: done is true
todos.update(0, { done: true });                       // a row is frozen, a change goes through the table
todos.column('title');                                 // ['milk', 'eggs']
todos.where({ done: false });                          // the rows a test of match lets through
todos.columns;                                         // ['title', 'done']
```

every `List` method works, the ones that add or replace rows (`push`, `unshift`, `set`, `splice`, `replace`, `update`) check them. `$Table` has one version for the whole table: any write updates whatever read the table.

## Tree

nested nodes-like structure

## Tuple

a fixed number of values in a fixed order, frozen.

```js
const entry = new Tuple('rat', 3);
entry[0];                            // 'rat'
const [name, count] = entry;
entry.with(1, 4);                    // a new tuple ('rat', 4)
entry.equals(new Tuple('rat', 3));   // true
```

## Union

Union is a schema only: one of several schemas, the first that fits wins.

```js
const Id    = Union (Num.int, Str.uuid);
const Shade = Union ({ hex: Str.pattern(/^#[0-9a-f]{6}$/i), named: Enum('red', 'blue')

Id.is(3);              // true
Shade.which('red');    // 'named', the case that fits (an index for Union(a, b))
```

a union value is just a value of one of its cases, a string or a number, it has nothing of its own. so there is no data type and no reactive variant: `let $id = Id` is a signal that only takes what fits.

---

# Additional Data Types

## Color

one color, read and written in any notation. it holds rgba, `hex` and `h` `s` `l` are read and
written through it (codecs, see [codecs](https://github.com/Pulgasari/pulgasari.github.io/blob/main/md/webdev/codecs.md)).

```js
const accent = new Color('#ff8800');   // or 'rgb(255 136 0)', 'hsl(32 100% 50%)', [255, 136, 0],
                                       // { r, g, b }, { h, s, l }, another Color
accent.r;              // 255
accent.h;              // 32
accent.l = 70;         // lighter, r g b follow
accent.a = 0.5;
accent.hex;            // '#ffad5c80'
accent.mix('#000');    // a new color, half way to black
accent.set('hsl(200 50% 50%)');
```

## FileExt

## Path

a gray has no hue: after `s = 0`, `h` reads 0. named css colors (`'red'`) are not read yet.
