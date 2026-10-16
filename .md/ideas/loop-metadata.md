# rat :: loop metadata

status: **idea**, tied to an **open decision** ([d-15](#d-15)).

## idea: `$loop` and `@sep` (from latte)

**origin.** latte's `{foreach}` hands every loop an `$iterator` that knows where it is,
and `{sep}` renders something between items, but not after the last:

```latte
{foreach $users as $user}
  <li class="{$iterator->first ? 'first'}">{$iterator->counter}. {$user->name}</li>
{/foreach}

{foreach $tags as $tag}{$tag}{sep}, {/sep}{/foreach}
```

**problem.** "is this the first / last item?" and "a comma between items" come up in
almost every list. without help, you compare the index against `list.length - 1` by
hand, every time.

**in rat.**

```html
@for (user of $users)
  <li class:first={$loop.first}>{$loop.number}. {user.name}</li>

@for (tag of $tags)
  {tag}
  @sep: ,
```

- `$loop` exists inside every `@for` body: `index` (0-based), `number` (1-based),
  `first`, `last`, `length`. it starts with `$` because it changes when the list does.
- `@sep` renders between items only.

**cost.** small. the runtime's `each()` knows all of this already, it only has to hand
it over. `$loop` replaces the open question about a reactive index ([d-15](#d-15)).

<a id="d-15"></a>
## d-15 · the index in `@for`

- [ ] a) a plain number, stale after a reorder **(v0)**
- [ ] b) a signal when the body uses it
- [ ] c) `$loop` instead: `$loop.index`, `.number`, `.first`, `.last`, `.length`, always current **(rec)**
