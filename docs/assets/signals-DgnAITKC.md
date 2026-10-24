# Signals

A signal is a value that tells whoever read it when it changes. In a `.rat` script every `$name` is one.

```ratjs
let   $count  = 0;            // a signal
const $double = $count * 2;   // computed: follows $count
$count++;                     // the markup that read $count or $double updates
```

- `let $x = …` is a signal you write to.
- `const $x = …` is computed from other signals, read only.
- no `.value` to write: the compiler adds it.

## Effects

```ratjs
import { effect } from '@rat/runtime';

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

An array, a `Map` or a `Set` assigned to a `$name` becomes its reactive variant: changing it in place updates the markup as well.
