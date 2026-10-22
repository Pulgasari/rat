# @rat/types

## overview

### Data Types
[Color](#color) ·
[Dict](#dict) ·
[Enum](#enum) ·
[List](#list) ·
[Point](#point) ·
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

---

# introduction

three things, kept apart:

| | what it is | examples |
|---|---|---|
| **data types** | classes whose instances hold data | `Array`, `Map`, `Set` (js), `Color`, `Enum`, `List`, `Record`, `Tuple` |
| **schemas** | descriptions that check and coerce a value: predicates with messages | `Str`, `Num.range(1, 9)`, `Color()`, `Enum('a', 'b')`, `List(Str)`, `Record({…})`, `Tuple(Str, Num)`, `Union(Num, Str)` |
| **reactive variants** | subclasses of data types whose reads subscribe and whose writes notify | `$Color`, `$Enum`, `$List`, `$Map`, `$Record`, `$Set` |

**one name, two forms.** where a data type has a schema, both go by the same name `new` makes a value, a call makes the schema. `Map` and `Set` work the same way in js already: `new Map` is a map, `Map()` is something else (an error there).

```js
new List(['a', 'b'])                  // a list
List(Str)                             // the schema: a list of strings

new Enum('grid', 'list', 'masonry')   // a value that holds one of them
Enum('grid', 'list', 'masonry')       // the schema: one of them

new $Enum('grid', 'list', 'masonry')  // the same value, reactive
```

| | value (`new`) | schema (call) | reactive |
|---|---|---|---|
| `Color` | yes | `Color()` | `$Color` |
| `Enum` | yes | `Enum('a', 'b')` | `$Enum` |
| `List` | yes | `List(Str)` | `$List` |
| `Record` | yes | `Record({ … })` | `$Record` |
| `Tuple` | yes, frozen | `Tuple(Str, Num)` | none: a change is a new tuple |
| `Union` | none | `Union(Num, Str)` | none | 
| `Bool`, `Num`, `Str` | plain js | the schema itself | none |

`Union` has no value of its own: a value of `Union(Num, Str)` is a number or a string. the same for `Bool`, `Num` and `Str`. reactive, these are typed signals (`let $id = Union(Num, Str)`),.see below.

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

```js
const tags = new List(['a', 'b']);
tags.push('c');
tags.at(-1);      // 'c'
tags.length;      // 3
```

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

## Tuple

a fixed number of values in a fixed order, frozen.

```js
const entry = new Tuple('rat', 3);
entry[0];                            // 'rat'
const [name, count] = entry;
entry.with(1, 4);                    // a new tuple ('rat', 4)
entry.equals(new Tuple('rat', 3));   // true
```

## Additional Data Types

### Color

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

a gray has no hue: after `s = 0`, `h` reads 0. named css colors (`'red'`) are not read yet.

# Schemas

schemas are values:
- they check and coerce a value, know where a signal starts and describe themselves.
- they speak the standard schema interface (`~standard`), so a signal takes them, and so do zod- or valibot-aware libraries.
- `Schema.is` is the predicate.

<../../.md/concept.md#5-types-are-values>
<../../.md/ideas/types.md#d-14>

```js
import { Bool, Enum, List, Num, Record, Str } from '@rat/types';

export const Todo = Record({
  done  : Bool,
  id    : Str.uuid,
  title : Str.min(1),
});

export const Settings = Record({
  tags : List(Str),
  view : Enum('grid', 'list'),
  zoom : Num.range(50, 200).default(100),
});

Settings.is({ tags: ['a'], view: 'grid', zoom: 120 });   // true
Settings.initial;                                        // { tags: [], view: 'grid', zoom: 100 }
```

| | |
|---|---|
| `Bool`, `Num`, `Str` | scalars. `Bool` reads `'true'`, `'yes'`, `'on'` …, `Num` reads numeric strings |
| `Num.min(n)`, `.max(n)`, `.range(a, b)`, `.int` | |
| `Str.min(n)`, `.max(n)`, `.pattern(re)`, `.email`, `.uuid` | |
| `Enum(...values)` | one of them, the first is the initial value |
| `List(item)`, `.min(n)`, `.max(n)` | an array or a `List` whose items are checked and coerced |
| `Record(shape)` | known fields checked, unknown ones kept |
| `Tuple(...items)` | an array or a `Tuple` of exactly these items |
| `Union(...cases)`, `Union({ name: case })`, `.which(x)` | the first case that fits; `which` names it |
| `Color()` | anything that reads as a color, kept as it is |
| `.default(x)`, `.optional()`, `.check(fn, message)` | on every schema |
| `validate(x)`, `is(x)`, `parse(x)`, `describe` | `{ value }` or `{ issues: [{ message, path }] }` |

a schema as a signal's initial value makes a typed signal (d-14 a): it starts at the schema's initial value and checks every write.

```html
<script>
  let $view = Enum('grid', 'list');   // a signal, starts at 'grid'
  $view = 'table';                    // dropped, with a warning: one of grid, list
</script>
```

## reactive variants

made with `reactive()` from [`@rat/signals`](../signals/README.md). they look like the originals, only named with `$`, and work the same in `.js`, `.rat.js` and `.rat`:

```js
import { $Enum, $Map } from '@rat/types';

const $seen = new $Map;
$seen.set('a', 1);
$seen.get('a'); // reading tracks, set() updates whatever read it

const $view = new $Enum('grid', 'list', 'masonry');
$view.cycle(); // whatever read $view.value updates

const $accent = new $Color('#ff8800');
$accent.l = 70; // whatever read $accent.hex, .r, .h … updates

const $settings = new $Record(Settings);
$settings.zoom = 120; // whatever read any field updates
```

- reading methods and getters subscribe, writing methods and setters notify, a write that changes nothing notifies nobody (`set` with the same value, `pop` on an empty list).
- `$Record` has one version for all fields: a write to one field updates whatever read any field (d-23 b). a signal per field would be finer, and pays off only for large records.
- the variants are also registered for `Array`, `Color`, `Enum`, `List`, `Map`, `Record` and `Set` when this package is imported. from then on `let $todos = []` in a `.rat` script is a signal holding a `$List` (d-23 c), and can be reassigned:

```html
<script>
  import '@rat/types'; // once, anywhere in the app: fills the registry

  let $todos = [];
  const add  = title => $todos.push({ title, done: false });   // reactive
</script>

<p>{$todos.length} todos</p>
@for (todo of $todos): <li>{todo.title}</li>
```

### typed signal or `$Enum`?

`let $view = Enum('grid', 'list')` is a signal holding a string: `$view` reads `'grid'`, a write is checked. `new $Enum('grid', 'list')` is an object: `$view.value` reads, `$view.cycle()` moves on. the first fits a value that is only set, the second one that is stepped through.

not yet: `persist` through `@bunker`, the compiler reading a static schema, the
sketch below (unique values, optionally sorted) as options on `List`.

---

## data types (sketch)

---


# choice

rat's switch: pairs of a test and what to do, tried from the top, the first match wins. a
function alone at the end is the fallback. it grew out of the drafts `@pulgasari/shift`
(named predicates) and `@pulgasari/typeshift` (patterns as strings), see
`pulgasari.github.io/md/analyze/shift-typeshift.md`.

```js
import { choice, Num, Str } from '@rat/types';

const toElements = choice(
  [null,       ()     => [document.documentElement]],
  [Str,        target => [...document.querySelectorAll(target)]],
  [Element,    target => [target]],
  [isIterable, target => [...target].filter(isElement)],
  ()          => [],
);
```

| test | matches |
|---|---|
| a schema (`Num.range(0, 255)`, `Enum(…)`, `Record({…})`, any standard schema) | what it validates. the handler gets the value as the schema made it: `Num` turns `'120'` into `120` |
| `String`, `Number`, `Boolean`, `BigInt`, `Symbol`, `Function` | by `typeof`, nothing coerced |
| a class (`Element`, `Date`, `Map` …) | by `instanceof`: a function whose name starts with a capital |
| a predicate (`isIterable`, `value => value > 3`) | what it says |
| a `RegExp` | a string it matches |
| an object `{ type: 'user', name: String }` | every key against its own test, more keys allowed |
| an array `[Number, Number]` | a tuple: as many items, each against its test |
| anything else (`null`, `'grid'`, `3`) | the literal, `Object.is` |

a handler that is no function is the result as it is (`[null, 'nothing']`). nothing matches and
no fallback: `undefined`. a single test: `choice.matches(test, value)`.

pairs instead of object keys: the order is what is written (keys that look like numbers would
jump ahead), and a test can be anything, not only a name.

---

# types

## Choice

## Color

## Dict

map like

## List

flat array-like sequence of unique values of the same type. optionally auto-sorted.

## Point

## Tree

nested nodes-like structure

---

## usage

```js
import { Dict, List, Point } from '@rat/types';
```

```js
import '@rat/types/Dict.js';
import '@rat/types/List.js';
import '@rat/types/Point.js';
```

```js
import '@rat/types/index.js';
```

---

# scratch

```
union

Array
Bool
Number (Float, Int)
String

Deque
Map
Pair
Queue (FIFO)
Sequence
Set
Stack (LIFO)
Vector

List
List[Number]   NumberList
List[String]   StringList

Record

Tuple
literal:  let tuple = (123, 'Rat', true);
destruct: let ( a, b, c ) = tuple;

Color

Vec2 Vector2
Vec3 Vector3
```

Hier steht:

> the variants are also registered for `Array`, `Color`, `Enum`, `List`, `Map`, `Record` and `Set` when this package is imported. from then on `let $todos = []` in a `.rat` script is a signal holding a `$List` (d-23 c), and can be reassigned:

aber das is doch Quatsch. Ich hab nie gesagt, da solle dann magisch und unlogisch plötzlich `$List` statt `$Array' draus werden.
