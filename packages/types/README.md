# @rat/types

---

[Color](#color)
[Dict](#dict)
[List](#list)
[Point](#point)
[Tree](#tree)

#### reactive variants
[$Array](#)
[$Bool](#)
[$Color](#)
[$Dict](#)
[$Map](#)
[$List](#list)
[$Point](#point)
[$Set](#)
[$Tree](#)

---

# types

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
