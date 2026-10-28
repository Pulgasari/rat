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

## topics
[config](#/config) ·
[components](#/components) ·
[comptime](#/comptime) ·
[directives](#/directives) ·
[htx](#/htx) ·
[modules](#/modules) ·
[schemas](#/schemas) ·
[signals](#/signals) ·
[types](#/types)
