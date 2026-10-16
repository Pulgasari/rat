# @rat/types

## schemas (v0)

schemas are values ([concept 5](../../.md/concept.md#5-types-are-values), [d-14 a](../../.md/ideas/types.md#d-14)): they check and coerce a value, know where a signal starts and describe themselves. they speak the standard schema interface (`~standard`), so a signal takes them, and so do zod- or valibot-aware libraries.

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
```

```html
<script>
  let $view = Enum('grid', 'list');   // starts at 'grid'
  $view = 'table';                    // dropped, with a warning: one of grid, list
</script>
```

| | |
|---|---|
| `Bool`, `Num`, `Str` | scalars. `Bool` reads `'true'`, `'yes'`, `'on'` …, `Num` reads numeric strings |
| `Num.min(n)`, `.max(n)`, `.range(a, b)`, `.int` | |
| `Str.min(n)`, `.max(n)`, `.pattern(re)`, `.email`, `.uuid` | |
| `Enum(...values)` | one of them, the first is the initial value |
| `List(item)`, `.min(n)`, `.max(n)` | every item checked and coerced |
| `Record(shape)` | known fields checked, unknown ones kept |
| `.default(x)`, `.optional()`, `.check(fn, message)` | on every schema |
| `validate(x)`, `is(x)`, `parse(x)`, `describe` | `{ value }` or `{ issues: [{ message, path }] }` |

not yet: reactive variants with verbs (`$List.push`, `$Enum.cycle`, d-23 c), `persist` through `@bunker`, the compiler reading a static schema.

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
