# rat :: syntax v0

what the prototype compiler understands. anything marked *(planned)* is not built yet.
open choices are linked to [ideas/](ideas/README.md).

- [file](#file) · [holes](#holes) · [tags](#tags) · [attributes](#attributes) · [behaviors](#behaviors) · [event modifiers](#event-modifiers)
- [control flow](#control-flow): [three body forms](#three-body-forms), [`@if`](#if), [`@for`](#for), [`@switch`](#switch), [`@fragment`](#fragment)
- [script sugar](#script-sugar): [signals](#signals), [typed signals](#typed-signals), [named cases](#named-cases), [pipe](#pipe), [ranges](#ranges), [`for…of`](#forof-without-a-declaration)
- [`.rat.js`](#ratjs) · [styles](#styles) · [open](#open)

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

## holes

```html
<p>hello {name}</p>
<p title={title}>…</p>
<p class="card {size}">…</p>         <!-- string with holes -->
<p>{items |> count}</p>                <!-- script sugar works everywhere -->
```

a literal `{` in text: `{'{'}`.

## tags

| notation | meaning |
|---|---|
| `<div>` | html element |
| `<data-list>` | custom element |
| `<Item>` | component (a capital = an identifier in scope) |
| `<div#main.card.big>` | id + classes (htx) |
| `<.card>` | a `div` with a class (htx) |
| `<svg>…</svg>` | svg namespace for the whole subtree |
| `</div>`, `</div.card>`, `</>` | close. the name after `</` is not checked, only counted |
| `<slot />` | `props.children` of the component |

## attributes

| notation | meaning |
|---|---|
| `a="x"`, `a='x'` | string |
| `a={expr}` | expression, bound reactively |
| `a` | `true` |
| `a\|b={expr}` | prop group: both get the same value (htx) |
| `class:on={expr}` | class on/off |
| `style:color={expr}` | a single css property |
| `onclick={fn}`, `on:click={fn}` | event listener |
| `onclick='save'` | **command**: fires `rat:command` with `{ name: 'save', event }` |
| `on:keydown[enter]={fn}`, `on:submit!={fn}`, `on:click:once={fn}` | event with modifiers, see [event modifiers](#event-modifiers) |
| `@tooltip={text}`, `@flash:click="#ff0"`, `use:tooltip={text}` | a behavior, see [behaviors](#behaviors) |
| `bind:value={$x}` | two-way binding to a signal (`value`, `checked`, `open` …) |
| `ref={fn}` / `ref={$el}` | the element, to a function or a signal |
| `{...obj}` | spread (at creation). on an element `class` and `style` add up, everything else: later wins |
| `{name}` | short for `name={name}` |

## control flow

`@if`, `@for` and `@switch` are blocks around markup. they are no attributes: an `@`
on an element is a [behavior](#behaviors).

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

### recognition

`@if`, `@for`, `@switch`, `@fragment` are recognized only at the start of a line, after whitespace,
after a tag or after `}`. `mail@for.example` stays text. a `}` closes only while a
block is open; otherwise it is text.

## script sugar

applies in `<script>`, `<script module>`, every hole and every `.rat.js` file.

### signals

```js
let   $count  = 0;            // $$.$(0), a signal
const $double = $count * 2;   // $$.computed(() => $count.value * 2)
$count++;                     // $count.value++

let   $seen   = new $Map;     // stays as written: no signal, no .value
$seen.set('a', 1);            // $seen.set('a', 1)
```

a `$name` made with `new $Variant(…)` ([reactivity](ideas/reactivity.md)) is used exactly
like in plain js: the object reports its own reads and writes. it changes through its
methods, reassigning it is a compile error.

### typed signals

a schema as the initial value ([d-14 a](ideas/types.md#d-14), [`@rat/types`](../packages/types)):
the signal starts at the schema's initial value and checks every write. a rejected value
is dropped with a warning, a coerced one is stored coerced.

```js
import { Enum, Num } from '@rat/types';

let $view = Enum('grid', 'list');           // 'grid'
let $zoom = Num.range(50, 200).default(100);
$view = 'table';                            // dropped: one of grid, list
$zoom = '120';                              // 120
```

no new syntax: `signal()` takes anything with a standard schema interface (`~standard`),
so a zod or valibot schema works as well (its initial value is `undefined`).

### named cases

a `case` as a declaration: a pattern with a name, reusable in `@switch`, `@if` and
scripts ([d-30](ideas/pattern-matching.md#d-30), [pattern matching](ideas/pattern-matching.md#named-cases)).

```js
case Loading = { status: 'loading' };
case Failed  = { status: 'error', message };     // message: a part it hands out
case Adult   = { age } if age >= 18;             // a guard after the parts
case Email   = string if #.includes('@');        // # in a guard is the value
export case Done = { status: 'done' };           // in <script module> or .rat.js
```

```js
if (input is Email) send(input);
const adults = $users.filter(user => user is Adult);
```

```html
@if ($user is Adult): <a href="/shop">shop</a>
```

| in a pattern | means |
|---|---|
| `{ key: pattern, name }` | an object; a shorthand or a lowercase name hands out that part |
| `[a, b, ...rest]` | an array, exactly that long (at least, with `...rest`) |
| `'x'`, `1`, `true`, `null`, `undefined` | equal (`===`) |
| `string`, `number`, `boolean`, `object` … | `typeof` |
| `Other`, `states.Other` | another case |
| anything else | an expression, compared with `===` |

- the name must start with a capital: `case Name = …`. `case` as a statement is a syntax
  error in plain js, so nothing valid changes meaning.
- `is` reads the postfix chain on its left: `!a is B && c` is `!(a is B) && c`. a plain
  `is` elsewhere stays a name (`obj.is(x)`, `const is = …`).
- a case compiles to `$$.pattern(value => parts | null)`; `x is Case` to `$$.is(x, Case)`.
  anything that is not a pattern compares with `Object.is`, so `x is 'idle'` works too.

### pipe

two forms, decided by the right side ([d-08](ideas/pipes.md#d-08), [d-09](ideas/pipes.md#d-09)):

```js
// implicit: the right side is a callable, nothing else
'some example' |> eene |> meene |> muh;          // muh(meene(eene('some example')))
value |> obj.method;                              // obj.method(value)
value |> (x => x * 2);                            // (x => x * 2)(value)

// explicit: # marks where the value goes
'some example' |> doThis(#) |> doThat(33, #);     // doThat(33, doThis('some example'))
value |> { a: #, b: null, c: # };                 // the value is bound once, used twice
$todos |> #.length |> `${#} todos`;               // # works in any expression

// a call without #: whatever the right side evaluates to is called (d-09)
'some example' |> makeFormatter();                // makeFormatter()('some example')
```

- the left operand reaches back to the next `=`, `,`, `;`, `(`, `?`, `:`, `return` …
  on its own bracket level. when in doubt, parens.
- a value used more than once is bound to a parameter, so it is evaluated once.
- `#` outside of a pipe is an error. `#private` names are untouched.

further pipe operators (`|?`, `|:`, `|*` …) are an idea, not built: [ideas/pipes](ideas/pipes.md).

### ranges

```js
1..5          // 1 2 3 4 5
5..1          // 5 4 3 2 1
'a'..'e'      // a b c d e
0..$count     // reactive in a hole: () => $$.range(0, $count.value)
(a + 1)..b    // an operand larger than a number, string or name goes in parens
[1..5]        // a real array: [1, 2, 3, 4, 5]
```

- inclusive on both ends. `a..b` becomes `$$.range(from, to)` from `@rat/runtime`: a
  `Span`, lazy (nothing is allocated until it is iterated) but with the usual array
  methods (`map`, `filter`, `reduce`, `join`, `includes`, `at`, `length` …). `[a..b]`
  alone in brackets is an array (d-07).
- works everywhere script sugar does ([d-06](ideas/ranges.md#d-06)).
- `1..toString()` (valid js) now reads as a range. write `(1).toString()`.
- open: exclusive ranges, steps, bare letters ([d-05](ideas/ranges.md#d-05), [d-07](ideas/ranges.md#d-07)).

### `for…of` without a declaration

```js
for (item of items) {}       // for (const item of items) {}
```

careful: in plain js this would assign to an outer `item`. in rat never.

## `.rat.js`

plain js with everything from [script sugar](#script-sugar). additionally every
``html`…` ``, ``htx`…` `` and ``rat`…` `` without a `${…}` of its own is compiled as
rat markup, holes as `{…}` (all three for now, d-11):

```js
let $count = 0;

export const Counter = () => html`
  <button onclick={() => $count++}>{$count}</button>
`;
```

a template with `${…}` stays a runtime htx template.

## behaviors

an `@` on an element hands the element to a function: a tooltip, drag and drop,
autosizing, a pattern or filter from aufbau. `use:` is the same, written the other way
round (both stay until practice shows which reads better).

```html
<button @tooltip={'save the file'}>save</button>
<textarea @autosize></textarea>
<section @pattern={{ id: 'dots', fg: $color }}>…</section>
<button @flash:click="#ffd400">…</button>          <!-- an argument after the colon -->
<h2 use:filter={$filter}>RAT</h2>
```

```js
// a behavior: (element, value, arg) => nothing | cleanup | { update (value), destroy () }
const pattern = (element, { id, ...options }) => {
  patterns.apply(element, id, options);
  return () => patterns.remove(element);
};
```

- the name is a function in scope: `@auto-size` looks for `autoSize`.
- it runs once the element exists, with its children. a value change calls `update`,
  or (without one) cleans up and runs again. the cleanup goes with the element.
- see `demos/examples/behaviors.rat`.

## event modifiers

```html
<input on:keydown[enter]={send} />                   <!-- only for that key -->
<input on:keydown[ctrl+c|space+a]={copy} />          <!-- | alternatives, + a combination -->
<form on:submit!={add}>                              <!-- event.preventDefault() first -->
<button on:click:once={init}>                        <!-- once, then the listener is gone -->
<button once:click={init}>                           <!-- the same -->
<button on:click:1={init}>                           <!-- the same -->
<button on:click:3={tap}>                            <!-- three times -->
<input on:keydown[escape]!={clear} />                <!-- combined: key, then !, then count -->
```

- key names are lowercase `event.key` values, plus `space`, `esc`, `up`, `down`,
  `left`, `right`, `ctrl`. a modifier (`ctrl`, `shift`, `alt`, `meta`) must match
  exactly: `[enter]` does not fire on shift+enter.
- in `space+a`, `space` has to be held when `a` is pressed.
- `!` is decided ([d-24](ideas/event-modifiers.md#d-24)). the three forms of "once" all stay for now
  ([d-25](ideas/event-modifiers.md#d-25)); the attribute syntax as a whole gets one more look later.
- modifiers need the `on:` / `on` prefix form on elements.

## styles

`<style>` is css. `scss`, `sass` and `ass` ([`@aufbau/ass`](https://github.com/pulgasari/aufbau/tree/main/ass))
are built in ([d-20](ideas/styles.md#d-20)):

```html
<style lang="scss">
  .card { .title { font-weight: 700; } }
</style>
```

```js
await compileAsync(source, { filename });      // loads sass / @aufbau/ass on first use
await loadStyles('scss', 'ass'); compile(…);   // or load once, then compile synchronously
compile(source, { styles: { less: code => … } }); // any other language: pass a function
```

- `lang="scss"` or `type="text/scss"`.
- a loader tries the bare specifier first (`sass`, `@aufbau/ass`: an import map or
  `node_modules`), then a pinned url.
- *(planned)* a service worker that compiles `.rat` files on request, so a plain browser
  page can `import './card.rat'` without a build.

### css files

```html
<script>
  style link   'https://code.pulgasari.dev/gestalt/packages/css/aufbau.css';
  style adopt  'https://code.pulgasari.dev/gestalt/packages/css/gestalt.css';
  style inline 'local.css';
  style        'other.css';                 // adopt is the default
</script>

<style mode="link"   src="https://code.pulgasari.dev/gestalt/packages/css/aufbau.css" />
<style mode="adopt"  src="https://code.pulgasari.dev/gestalt/packages/css/gestalt.css" />
<style mode="inline" src="local.css" />
<style src="other.css" />
```

| mode | what happens | scope |
|---|---|---|
| `link` | a `<link rel="stylesheet">` in the head, once per url | global |
| `adopt` (default) | fetched, a constructable stylesheet in `document.adoptedStyleSheets`, once per url | global |
| `inline` | read while compiling, added to the component's `<style>`. no request at runtime, no unstyled flash. `.scss` / `.sass` / `.ass` go through that language | the component |

- the statement works in `<script>` and `<script module>`, at the top level, at the start of a
  statement. `style` stays a plain name everywhere else (`style.color`, `const style = …`).
- relative paths resolve against the `.rat` file. `link` and `adopt` run when the module is
  first imported.
- `url(…)` inside an adopted or inlined file resolves against that file.
- `@import` does not work in an adopted file (constructable stylesheets ignore it), use `link`.
- `inline` needs the file while compiling: `compileAsync(source, { read: path => text })`.
  `@rat/app` passes it.

## open

- comments in markup: `<!-- -->` disappears. a line form (`// …` at the start of a line)?
- whitespace: v0 collapses runs to one space and drops pure line-break texts. `<pre>`
  is kept as is.
- positional values and shorthand tags from htx (`<$icon 'bx:search' />`), see your
  todo on redesigning `<$xyz>`.
- `@await`: three variants in [d-28](ideas/async-blocks.md#d-28).
- `@let name = expr` in markup for local derivations.
