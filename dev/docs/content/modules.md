# Modules

Three kinds of files, and how state goes between them.

| file | |
|---|---|
| `Card.rat` / `Card.rat.html` | a component: markup, `<script>`, `<style>` |
| `state.rat.js` | plain js with rat's script sugar: signals, `|>`, `match` |
| `util.js` | plain js, nothing compiled |

## State in a `.rat.js`

```ratjs
// tasks.rat.js
export let   $queue = [];
export const $busy  = $queue.some(task => task.running);

export function add (task) { $queue.push(task); }
```

```rat
<!-- Status.rat -->
<script>
  import { $busy, $queue as $tasks, add } from './tasks.rat.js';
  const $count = $tasks.length;
</script>

@if ($busy): <p>{$count} running</p>
```

An imported `$name` is read and written like one of the file's own.

## `<script module>`

Runs once per file, not per instance: state all instances of a component share.

```rat
<script module>
  let $clicks = 0;          // one count for every Panel on the page
</script>

<button onclick={() => $clicks++}>{$clicks}</button>
```

## Markup in a `.rat.js`

An `html` template without `${…}` is compiled as rat markup:

```ratjs
let $count = 0;

export const Counter = () => html`
  <button onclick={() => $count++}>{$count}</button>
`;
```

## Lazy

```rat
<rat-view route='/pdf' lazy={() => import('./views/PdfView.rat.html')} />
```

The view and what it imports load on its first activation.
