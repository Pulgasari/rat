# @rat/types

three things, kept apart:

| | what it is | examples |
|---|---|---|
| **data types** | classes whose instances hold data | `Array`, `Map`, `Set` (js), `List`, `Enum` |
| **schemas** | descriptions that check and coerce a value: predicates with messages | `Str`, `Num.range(1, 9)`, `List(Str)`, `Enum('a', 'b')`, `Record({…})` |
| **reactive variants** | subclasses of data types whose reads subscribe and whose writes notify | `$List`, `$Map`, `$Set`, `$Enum` |

**one name, two forms.** where a data type has a schema, both go by the same name:
`new` makes a value, a call makes the schema. `Map` and `Set` work the same way in js
already: `new Map` is a map, `Map()` is something else (an error there).

```js
new List(['a', 'b'])                  // a list
List(Str)                             // the schema: a list of strings

new Enum('grid', 'list', 'masonry')   // a value that holds one of them
Enum('grid', 'list', 'masonry')       // the schema: one of them

new $Enum('grid', 'list', 'masonry')  // the same value, reactive
```

`Bool`, `Num`, `Str` and `Record` are schemas only: what they describe are plain js values
(`true`, `3`, `'a'`, `{…}`).

## data types

### List

a list that is a class of its own, not an Array subclass: `length` is a getter, `at(i)` and
`set(i, value)` replace `[i]` (index access would need a proxy). `map`, `filter`, `slice` …
return plain arrays.

```js
const tags = new List(['a', 'b']);
tags.push('c');
tags.at(-1);      // 'c'
tags.length;      // 3
```

### Enum

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

`new Enum(View)` starts from a schema (`View = Enum('grid', 'list').default('list')` starts at
`'list'`), `new Enum(other)` copies another one at its value.

## schemas

schemas are values ([concept 5](../../.md/concept.md#5-types-are-values), [d-14 a](../../.md/ideas/types.md#d-14)):
they check and coerce a value, know where a signal starts and describe themselves. they speak
the standard schema interface (`~standard`), so a signal takes them, and so do zod- or
valibot-aware libraries. `Schema.is` is the predicate.

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
| `.default(x)`, `.optional()`, `.check(fn, message)` | on every schema |
| `validate(x)`, `is(x)`, `parse(x)`, `describe` | `{ value }` or `{ issues: [{ message, path }] }` |

a schema as a signal's initial value makes a typed signal (d-14 a): it starts at the schema's
initial value and checks every write.

```html
<script>
  let $view = Enum('grid', 'list');   // a signal, starts at 'grid'
  $view = 'table';                    // dropped, with a warning: one of grid, list
</script>
```

## reactive variants

made with `reactive()` from [`@rat/signals`](../signals/README.md). they look like the originals,
only named with `$`, and work the same in `.js`, `.rat.js` and `.rat`:

```js
import { $Enum, $Map } from '@rat/types';

const $seen = new $Map;
$seen.set('a', 1);
$seen.get('a');          // reading tracks, set() updates whatever read it

const $view = new $Enum('grid', 'list', 'masonry');
$view.cycle();           // whatever read $view.value updates
```

- reading methods and getters subscribe, writing methods and setters notify, a write that
  changes nothing notifies nobody (`set` with the same value, `pop` on an empty list).
- `$List`, `$Map`, `$Set` and `$Enum` are also registered for `Array`, `List`, `Map`, `Set` and
  `Enum` when this package is imported. from then on `let $todos = []` in a `.rat` script is a
  signal holding a `$List` (d-23 c), and can be reassigned:

```html
<script>
  import '@rat/types';            // once, anywhere in the app: fills the registry

  let $todos = [];
  const add  = title => $todos.push({ title, done: false });   // reactive
</script>

<p>{$todos.length} todos</p>
@for (todo of $todos): <li>{todo.title}</li>
```

### typed signal or `$Enum`?

`let $view = Enum('grid', 'list')` is a signal holding a string: `$view` reads `'grid'`, a write
is checked. `new $Enum('grid', 'list')` is an object: `$view.value` reads, `$view.cycle()` moves
on. the first fits a value that is only set, the second one that is stepped through.

not yet: `$Record`, `persist` through `@bunker`, the compiler reading a static schema, the
sketch below (unique values, optionally sorted) as options on `List`.

---

## data types (sketch)

---

[Color](#color)
[Choice](#choice)
[Dict](#dict)
[List](#list)
[Point](#point)
[Tree](#tree)

#### reactive variants
[$Array](#)
[$Bool](#)
[$Choice](#)
[$Color](#)
[$Dict](#)
[$Map](#)
[$List](#list)
[$Point](#point)
[$Set](#)
[$Tree](#)

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
