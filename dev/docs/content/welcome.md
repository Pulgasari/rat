# Getting started

rat is an experimental js-framework in early stage of development.

it doesn't provide any revolutionary ideas but it fits my personal preferences.

## `.rat` files :: components

```rat
<script comptime>
  import data from './data/items.json5';
</script>

<script>
  items = RAT.List.create(data);
</script>

<ul>
@for (item of $items): <li>{item.title}</li>
</ul>

<style>
  ul {
    gap|padding: 1rem;
  }
</style>
```

## Start

```html
<!-- index.html -->
<script src='./rat/packages/app/run/run.js'></script>
<rat-app src='app.rat'></rat-app>
```

```rat
<!-- app.rat -->
<script>
  let $count = 0;
</script>

<button onclick={() => $count++}>clicked {$count} times</button>
```

No build needed: the page compiles `.rat` files as it loads them. `rat build` (vite) compiles them ahead.

## Topics
[components](#/components) ·
[signals](#/signals) ·
[directives](#/directives) ·
[htx](#/htx) ·
[styles](#/styles) ·
[modules](#/modules) ·
[operators](#/operators) ·
[schemas](#/schemas) ·
[types](#/types) ·
[persistence](#/persistence) ·
[comptime](#/comptime) ·
[config](#/config) ·
[dom](#/dom) ·
[import](#/import)
