# rat :: local names in markup

status: **idea**.

## idea: `@let` (from svelte)

**origin.** svelte's `{@const}` declares a name inside a block:

```svelte
{#each boxes as box}
  {@const area = box.width * box.height}
  <p>{box.width} × {box.height} = {area}</p>
{/each}
```

**problem.** a value computed per item (inside `@for`) has no place to live: the
`<script>` runs once per component, not once per item. so the expression gets repeated
in several holes.

**in rat.**

```html
@for (box of $boxes)
  @let area = box.width * box.height
  <p>{box.width} × {box.height} = {area}</p>
  <meter value={area} max="100"></meter>
```

**cost.** small. the compiler turns it into a `const` at the start of the body function.
