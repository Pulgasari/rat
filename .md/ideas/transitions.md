# rat :: enter and leave animations

status: **idea**.

see also: [behaviors](behaviors.md)

## idea (from svelte)

**origin.** svelte animates an element when an `{#if}` adds or removes it:

```svelte
{#if visible}
  <p transition:fade={{ duration: 200 }}>hello</p>
{/if}
```

**problem.** css cannot animate an element that is removed from the dom: it is gone
before the animation could run. the code that removes it has to wait.

**in rat.**

```html
@if ($visible)
  <p transition:fade>hello</p>
```

the runtime's `when()` and `each()` already decide when nodes leave. with a
`transition:`, they play an animation (web animations api) and remove the node
afterwards.

**cost.** medium: leaving nodes have to stay in place for the duration, and a
quick toggle must not leave two copies behind.

## notes

proper transition handling wäre nice, aber vllt reicht bereits use/@` in kombi mit transitionlib?

**reply:** for entering, yes: a behavior can animate the element when it appears. for
leaving, no: when an `@if` turns false, the runtime removes the node right away, and a
behavior only gets its cleanup call when the node is already gone. leave animations need
the runtime to wait (the idea above). a small hook would do: a behavior may return
`{ leave (done) }`, and the runtime removes the node when `done` is called.
