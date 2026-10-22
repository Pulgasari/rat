# rat :: element behaviors

status: **built** in both forms, `@name` and `use:name`. which stays: **open decision** ([d-26](#d-26)).

see also: [syntax.md: behaviors](../syntax.md#behaviors), [transitions](transitions.md); svelte.md in `pulgasari.github.io/md/webdev/libs/` (svelte 5.29 replaced `use:` with `{@attach}`)

## idea (from svelte actions, lit directives)

**origin.** svelte's `use:` hands an element to a function when it appears, and calls
its cleanup when it goes:

```svelte
<script>
  function tooltip (node, text) {
    const tip = createTip(node, text);
    return { update: next => tip.set(next), destroy: () => tip.remove() };
  }
</script>

<button use:tooltip={'save the file'}>save</button>
```

**problem.** behavior that is not markup (a tooltip, drag and drop, focus trapping, autosizing a textarea) otherwise needs a `ref` plus manual setup and teardown in the script.

**in rat.**

```html
<button use:tooltip={'save the file'}>save</button>
<textarea use:autosize></textarea>
<section use:pattern={'dots 8%'}>…</section>
```

a behavior is a function `(element, value) => cleanup`. it runs again when the value changes. this is the same idea as the aufbau controller concept (`pattern=`, `filter=`, `hotkey=` as attributes on any element), so `@aufbau/patterns`, `@aufbau/filters` and `@aufbau/gestures` could ship rat behaviors directly.

**cost.** small in the runtime. the larger work is writing the behaviors.

## notes

on "unnecessarily complicated": in svelte a behavior had to return `{ update, destroy }`. 

in rat the simplest behavior is a function that returns its cleanup, and it simply runs again when the value changes; 

`{ update, destroy }` is optional, for behaviors that can update in place.

`@x:arg` passes the part after the colon as the third argument. 

the demo: `demos/examples/behaviors.rat` with `@pattern`, `use:filter` and `@flash:click`.

`<div @gestures:swipeable on:swipeLeft={...} />` works as written, if a `gestures`
behavior exists that dispatches `swipeleft` events: event names are lowercased.

```html
<button @tooltip={'save the file'}>save</button>
<textarea @autosize></textarea>
<section @pattern='dots 8%'>…</section>
<div @gestures:swipeable on:swipeLeft={...} />
<div @swipeable:swipeLeft={...} />
```
