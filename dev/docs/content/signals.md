# Signals

A signal is a value that tells whoever read it when it changes. In a `.rat` script every `$name` is one.

```ratjs
let   $count  = 0;            // a signal
const $double = $count * 2;   // computed: follows $count
$count++;                     // the markup that read $count or $double updates
```

- `let $x = …` is a signal you write to. At the top of a `.rat` script the `let` may be left out: `$count = 0`.
- `const $x = …` is computed from other signals, read only.
- no `.value` to write: the compiler adds it.

## Props and imports

```ratjs
let { $title, $size = 'm' } = this.props;   // follow the parent's props
import { $busy } from './tasks.rat.js';     // a signal of another module, read and written as one
```

## Effects

```ratjs
import { effect } from '@rat/signals';

effect(() => {
  document.title = `${$count} clicks`;
});
```

An effect runs again whenever a signal it read changes. A function it returns cleans up before the next run.

## Collections

```ratjs
let $todos = [];
$todos.push({ title: 'milk' });   // reactive too: a $Array
```

An array, a `Map` or a `Set` assigned to a `$name` becomes its reactive variant: changing it in place updates the markup as well. A `new $List`, `new $Record` … stays as written and is used without `.value`.

## Typed and kept

```ratjs
let $view! = Enum('grid', 'list');   // checked by the schema, kept beyond the page
```

See [schemas](#/schemas) and [persistence](#/persistence).

## Without the compiler

```js
import { computed, effect, signal, untrack } from '@rat/signals';

const count  = signal(0);
const double = computed(() => count.value * 2);
effect(() => console.log(double.value));
count.value++;
```
