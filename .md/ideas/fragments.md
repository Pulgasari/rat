# rat :: markup fragments

status: **built** as `@fragment` (d-27).

see also: [syntax.md: @fragment](../syntax.md#fragment)

## idea (from svelte)

**origin.** svelte 5's snippets: a piece of markup with parameters, defined once and
rendered in several places:

```svelte
{#snippet row(item)}
  <tr><td>{item.name}</td><td>{item.price}</td></tr>
{/snippet}

{#each fruits as fruit}{@render row(fruit)}{/each}
```

**problem.** a small repeated piece of markup is not worth its own `.rat` file, but
copying it three times is worse.

**in rat.**

```html
@fragment row (item)
  <tr><td>{item.name}</td><td>{item.price}</td></tr>

<table>
  @for (fruit of $fruits): {row(fruit)}
</table>
```

a fragment is a plain function that returns markup, so it can also be passed to a
child component as a prop.

**cost.** small. it compiles to a function inside the component.

<a id="d-27"></a>
## d-27 · the name for markup fragments with parameters → **`@fragment`**

your note: `@snippet` promises too much, and the thing really is a function that makes a
document fragment. → built as `@fragment row (item)`, top level of a `.rat` file, compiled
to a hoisted function in the component ([syntax.md](../syntax.md#fragment)).

## notes

find ich gut, auch den namen. aber bin mir unsicher, ob evtl bissl dirty, weil gemeinhin dom-fragments eben keine args haben können?

**reply:** a fair point. the thing itself is a function that returns a fragment, not a
fragment. names to choose from in [d-27](#d-27).
