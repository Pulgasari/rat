# Schemas

A schema describes what a value may be. It checks, coerces, knows an initial value, and it is a value itself: it exists at runtime.

```js
import { Bool, Enum, Num, Record, Str } from '@rat/types';

const Settings = Record({
  view : Enum('grid', 'list'),
  zoom : Num.range(50, 200).default(100),
  name : Str.min(1).max(40),
  '?note' : Str,                 // ? makes a field optional
});

Settings.parse({ view: 'list', zoom: '120', name: 'a' });   // { view: 'list', zoom: 120, name: 'a' }
Settings.parse({ view: 'table' });                          // TypeError: view: one of grid, list, …
Settings.initial;                                           // { view: 'grid', zoom: 100, name: '', note: '' }
```

## Checking

| | |
|---|---|
| `validate(x)` | `{ value }` or `{ issues: [{ message, path }] }`, never throws |
| `parse(x)` | the value, or a `TypeError` |
| `is(x)` | `true` / `false` |
| `initial`, `describe` | the start value; what the schema says about itself (for a form, a doc) |

## Building one

```js
Num.min(0).max(10).int
Str.pattern(/^#/, 'a hex color')
Str.email, Str.uuid
Bool                              // reads 'yes', 'on', 'true' …
Enum('a', 'b').default('b')
List(Str).min(1)
Union(Num, Str)                   // the first case that fits
Str.optional()                    // null and undefined pass
Num.check(n => n % 2 === 0, 'even')
```

Every method gives a new schema; a schema never changes.

## Cases of writing

```js
KebabCase.is('toggle-play');             // true
KebabCase.from('togglePlay');            // 'toggle-play'
Str.to(KebabCase).parse('Toggle Play');  // 'toggle-play': normalized on the way in
```

`CamelCase`, `ConstantCase`, `KebabCase`, `LowerCase`, `PascalCase`, `SnakeCase`, `TitleCase`, `UpperCase`.

## Typed signals

A schema as the initial value of a signal: it starts at the schema's initial value and checks every write.

```ratjs
let $view = Enum('grid', 'list');      // 'grid'
let $zoom = Num.range(50, 200);
$view = 'table';                       // dropped, with a warning
$zoom = '120';                         // 120
```

## Standard schema

Every schema has `~standard`: anything that takes a zod or valibot schema takes these, and `signal()` takes a zod schema as well.
