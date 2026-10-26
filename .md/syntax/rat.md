# RAT >> Syntax >> `.rat`-files

inside `.rat` files directives are put around or in front of markup.

`@if`, `@for` and `@match` are blocks around markup.

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
| `<script comptime>` | runs before the component exists (see [comptime](#comptime)): its top-level `const` and `let` land in the module as data |
| `<script module>` | module level. `export default` is refused, the markup is the default export |
| `<script>` | the body of the component function. `export` is refused |
| `<style>` | `@scope` around the elements with `data-rat="<hash>"` (rooted at their parent, so `.counter { … }` matches the `<div.counter>` on top too; the parent's other children are cut off), adopted as a constructable stylesheet. styles reach into child components (as css cascades), on conflicts the closer component wins (scope proximity). see [styles](#styles) |
| everything else | the markup |

the component is named after the file: `todo-list.rat` → `TodoList`.

### comptime

`<script comptime>` runs in the build (`@rat/dev`, `rat compile`), without a build in the page right before
the file is compiled. what its top-level `const` and `let` hold is baked into the module, the code that made it
and what it imports are not part of it:

```html
<script comptime>
  import { use } from '@gestalt/patterns';
  const dots  = await use('dots', { fg: '#f00', size: 12 }).image();
  const icons = await read('./icons.json', 'json');
</script>

<div style:background-image={dots}>
  @for (icon of icons): <svg-icon name={icon.name} />
</div>
```

```js
// the module
const dots  = "url(\"data:image/svg+xml,…\")";
const icons = [{ "name": "add" }, …];
```

- plain js: no rat sugar, no `$` names (a baked value does not change), no `export`. `await` at the top level works
- `read(path, as)`: a file relative to the component, `'text'` (default) or `'json'`
- a value is data: json, `undefined`, `NaN`, `±Infinity`, `-0`, `BigInt`, `Date`, `RegExp`, `URL`, `Map`, `Set`, a typed
  array. a function, a class instance, a dom node is a compile error naming it
- no dom in the build: what only makes a string works there (`image()` of a pattern), what injects into the page
  (`ensureFilter()`) does not
- in the build it runs in a vite server of its own: bare imports resolve through the import maps, as the app's do.
  `rat compile` imports it in node (node_modules). in the page it is a blob module under the page's import map: comptime is
  load time there, the result the same. `rat dev` and the vercel middleware leave such a file to the page
- what it imports and reads is watched by vite: an edit compiles the component again

at the top level of a `<script>`, `let` before a `$name` may be left out: the first assignment to
a `$name` declared nowhere at the top level declares it.

```html
<script>
  $count = 0;                    // let $count = 0
  const $double = $count * 2;    // const stays: a computed is never implied
</script>
```

not in `.rat.js`: there a `$count = 0` without a declaration stays what it is in js.

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

### `@match`

```html
@match ($view) {
  @case 'grid' { <grid-view /> }
  @case 'list': <list-view />
  @default     { <p>unknown</p> }
}

@match ($view)
  @case 'grid'
    <grid-view />
  @default
    <p>unknown</p>
```

- without braces, the `@case` / `@default` lines are the ones indented deeper than `@match`.
- a `@case` value ends at `{`, `:` or the end of its line. a value with a top level `:`
  (a ternary) goes in parens.
- a `@case` is a test like an arm of [match](syntax.md#match-1) (a case, a schema, a class, a literal …).
  a case declared in the same file hands out its parts to the branch, live:

```html
@match ($state)
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
