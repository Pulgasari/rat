# Types

`@rat/types` has schemas: values that check and convert a value. They are plain js, no TypeScript.

```js
import { Num, Str, Enum, Record } from '@rat/types';

Num.range(0, 255).parse('120');   // 120
Str.min(3).is('ab');              // false

const Settings = Record({ view: Enum('grid', 'list'), '?title': Str });
```

## Typed signals

A schema as the value of a signal checks every write:

```js
let $view = Enum('grid', 'list');   // starts at 'grid'
$view = 'table';                    // TypeError: one of grid, list
```

## Cases of writing

```js
import { KebabCase, Str } from '@rat/types';

KebabCase.is('togglePlay');               // false
KebabCase.from('togglePlay');             // 'toggle-play'
Str.to(KebabCase).parse('Toggle Play');   // 'toggle-play'
```

## Data types

| | |
|---|---|
| `List`, `$List` | a list of one kind |
| `Record`, `$Record` | fixed fields |
| `Table`, `$Table` | rows of one record |
| `Dict`, `$Dict` | a map with a key and a value schema |
| `Enum`, `$Enum` | one of a few values |

The ones with `$` are reactive: reading them in markup keeps it up to date.
