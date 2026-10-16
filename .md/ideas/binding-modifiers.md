# rat :: binding modifiers

status: **idea**.

## idea (from vue)

**origin.** vue's `v-model` takes modifiers that convert the value:

```vue
<input v-model.number="age">   <!-- a number, not "42" -->
<input v-model.trim="name">    <!-- without surrounding spaces -->
<input v-model.lazy="query">   <!-- updates on change, not on every key -->
```

**problem.** an `<input>` always gives a string. `bind:value={$size}` in the
syntax-tour example therefore needs `Number($size)` wherever the value is used.

**in rat.**

```html
<input type="range" bind:value.number={$size} />
<input bind:value.trim={$name} />
<input bind:value.lazy={$query} />
```

**cost.** small, in the runtime's `bind:`.
