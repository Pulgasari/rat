# RAT >> Syntax >> `.rat`-files

inside `.rat` files directives are put around or in front of markup.

`@if`, `@for` and `@switch` are blocks around markup.

they are no attributes: an `@` on an element is a [behavior](#behaviors).

## file

```html
<script module>
  // module level, runs once. exports, shared state
  let $todos = [];
</script>

<script>
  // component body, runs per instance. props is in scope, imports are lifted
  import Item from './item.rat';
  let $draft = '';
</script>

<section.todos>
  …markup…
</section.todos>

<style>
  /* limited to the component through @scope */
  .todos { display: grid; }
</style>
```

| block | ends up in |
|---|---|
| `<script module>` | module level. `export default` is refused, the markup is the default export |
| `<script>` | the body of the component function. `export` is refused |
| `<style>` | `@scope` around the elements with `data-rat="<hash>"` (rooted at their parent, so `.counter { … }` matches the `<div.counter>` on top too; the parent's other children are cut off), adopted as a constructable stylesheet. styles reach into child components (as css cascades), on conflicts the closer component wins (scope proximity). see [styles](#styles) |
| everything else | the markup |

the component is named after the file: `todo-list.rat` → `TodoList`.

### three body forms

every block body can be written three ways, mixed freely, per branch:

```html
<!-- 1. braces -->
@for (todo of $shown) {
  <li>{todo.title}</li>
} @else {
  <li>nothing to do</li>
}

<!-- 2. indentation: the lines below that are indented deeper than the head -->
@for (todo of $shown)
  <li>{todo.title}</li>
@else
  <li>nothing to do</li>

<!-- 3. one line: the rest of the line after : -->
@for (todo of $shown): <li>{todo.title}</li>
@else: <li>nothing to do</li>
```

rules (v0):

- **indentation**: a body ends at the first non-blank line indented no deeper than the
  line of its head. a block uses tabs or spaces, mixing them is an error ([d-04](ideas/blocks.md#d-04)).
- a closing tag ends an indented or one-line body inside its element:
  `<ul>@for (x of $xs): <li>{x}</li></ul>`.
- an **`@else`** belongs to the block whose head is on its own indentation. so a dedented
  `@else` after a nested indented block goes to the outer one.
- **one line**: the body ends at the end of the line, or where `@else`, `@case` or
  `@default` starts on the same line: `@if ($ok): <b>yes</b> @else: <i>no</i>`
  ([d-01](ideas/blocks.md#d-01), [d-02](ideas/blocks.md#d-02)).
- blocks nest in every form; a one-line body may hold another one-line block
  (`@if ($a): @for (x of $xs): <li>{x}</li>`, [d-03](ideas/blocks.md#d-03)).
- inside an outer `{ … }`, a `}` also ends an indented or one-line body.

### `@if`

```html
@if ($user) {
  <p>hello {$user.name}</p>
} @else if ($loading) {
  <p>loading …</p>
} @else {
  <button onclick='login'>login</button>
}

@if ($error): <p>{$error}</p>
```

### `@for`

```html
@for (todo of $todos) {
  <li>{todo.title}</li>
} @else {
  <li.empty>nothing to do</li.empty>
}

@for (todo, index of $todos) { <li>{index + 1}. {todo.title}</li> }
@for ({ id, title } of $todos) { <li id={id}>{title}</li> }
@for (n of 1..5): <li>{n}</li>
```

- `@else` applies to an empty list.
- elements are reused by item identity (keyed by identity).
- *(planned)* an explicit key: `@for (todo of $todos; key todo.id)`.

### `@switch`

```html
@switch ($view) {
  @case 'grid' { <grid-view /> }
  @case 'list': <list-view />
  @default     { <p>unknown</p> }
}

@switch ($view)
  @case 'grid'
    <grid-view />
  @default
    <p>unknown</p>
```

- without braces, the `@case` / `@default` lines are the ones indented deeper than `@switch`.
- a `@case` value ends at `{`, `:` or the end of its line. a value with a top level `:`
  (a ternary) goes in parens.
- a `@case` with a [named case](#named-cases) matches by pattern, anything else with
  `Object.is`. a case declared in the same file hands out its parts to the branch, live:

```html
@switch ($state)
  @case Loading: <p>loading …</p>
  @case Failed:  <p.alert>{message}</p>     <!-- message comes from the case -->
  @case 'idle':  <p>…</p>
  @default:      <app-view />
```

- an imported case matches, but its parts are not known to the compiler: no names from it
  in the branch (yet).
- patterns written into the `@case` itself (`@case { status: 'error' }`) wait for
  [d-30](ideas/pattern-matching.md#d-30) a/b/c.

### `@fragment`

markup with parameters, declared once and used as a function ([d-27](ideas/fragments.md#d-27)):

```html
@fragment row (item)
  <tr><td>{item.name}</td><td>{item.price}</td></tr>

<table>
  @for (fruit of $fruits): {row(fruit)}
</table>
```

- top level of a `.rat` file only (not inside an element or a block). in a `.rat.js`
  file write a function that returns ``html`…` ``.
- compiles to `function row (item) { return $$.html`…`; }` in the component, hoisted: the
  script can call it and hand it on as a prop.
- the parameters are plain values. the call sits in a live hole, so `{row($selected)}`
  runs again when `$selected` changes; the renderer sees the same template and only
  patches its holes.

# `<script>`

```html
<script>
  style link 'https://code.pulgasari.dev/aufbau/css/aufbau.css';
  style adopt 'https://code.pulgasari.dev/aufbau/gestalt/gestalt.css';
  style inline 'localfile.css';
</script>

<style mode='link'   src='https://code.pulgasari.dev/aufbau/css/aufbau.css' />
<style mode='adopt'  src='https://code.pulgasari.dev/aufbau/gestalt/gestalt.css' />
<style mode='inline' src='localfile.css' />
```
