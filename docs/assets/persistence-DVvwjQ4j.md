# Persistence

A value kept beyond the page: read back when it is made, written on every change.

## `$name!`

In `.rat` and `.rat.js`, a `!` after the name in a declaration. The key is the name.

```ratjs
let $theme! = Enum('zombie', 'oled', 'rainbow');
let $draft! = '';
export const $settings! = $Record({ view: Enum('grid', 'list'), zoom: Num.default(100) }).create();
export const $tabs!     = $List(Tab).create([{}]);
```

Inside a named view the key gets its name first: `podcasts:tabs`.

## On the schema

```ratjs
let $look = Enum('light', 'dark').stored({ key: 'look', in: 'session' });
```

## `stored()`

The same without the compiler:

```js
import { $Table, Bool, Enum, Str, stored } from '@rat/types';

const $theme = stored('theme', Enum('zombie', 'oled'));
const $todos = stored({ key: 'todos', debounce: 300 }, $Table({ title: Str, done: Bool }).create());
```

## Options

| | |
|---|---|
| `key` | default: the name |
| `in` | `'store'` (default), `'session'`, `'memory'`, `'database'` (a `Table` goes there) |
| `debounce` | ms after a change before it is written |
| `sync` | a change in another tab comes in |
| `version`, `migrate` | `migrate(old, version)` brings an old shape to today's |

What is read goes through the schema: coerced, a missing field at its initial value, a field that no longer fits as well.

```js
stored.forget('theme');   // back to the initial value, gone from its place
```
