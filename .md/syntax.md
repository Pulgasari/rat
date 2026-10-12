# rat :: syntax v0

was der prototyp-compiler versteht. alles mit *(geplant)* ist noch nicht gebaut.

## datei

```html
<script module>
  // modul-ebene, läuft einmal. exports, geteilter state
  let $todos = [];
</script>

<script>
  // component body, läuft pro instanz. props ist im scope, imports werden gehoben
  import Item from './item.rat';
  let $draft = '';
</script>

<section.todos>
  …markup…
</section.todos>

<style>
  /* automatisch per @scope auf die component begrenzt */
  .todos { display: grid; }
</style>
```

| block | landet in |
|---|---|
| `<script module>` | modul-ebene. `export default` ist verboten, das markup ist der default export |
| `<script>` | body der component-funktion. `export` ist verboten |
| `<style>` | `@scope ([data-rat="<hash>"]) { … }` ohne untere grenze, adoptiert als constructable stylesheet. styles reichen in kind-components hinein (wie css kaskadiert), bei konflikten gewinnt die nähere component (scope proximity) |
| alles andere | das markup |

die component heißt wie die datei: `todo-list.rat` → `TodoList`.

## holes

```html
<p>hallo {name}</p>
<p title={title}>…</p>
<p class="card {size}">…</p>       <!-- string mit holes -->
<p>{items |> count}</p>              <!-- js-sugar gilt überall -->
```

ein literales `{` im text: `{'{'}`.

## tags

| schreibweise | bedeutung |
|---|---|
| `<div>` | html-element |
| `<data-list>` | custom element |
| `<Item>` | component (großbuchstabe = identifier im scope) |
| `<div#main.card.big>` | id + klassen (htx) |
| `<.card>` | `div` mit klasse (htx) |
| `<svg>…</svg>` | svg-namespace für den ganzen teilbaum |
| `</div>`, `</div.card>`, `</>` | schließen. der name nach `</` wird nicht geprüft, nur gezählt |
| `<slot />` | `props.children` der component |

## attribute

| schreibweise | bedeutung |
|---|---|
| `a="x"`, `a='x'` | string |
| `a={expr}` | ausdruck, reaktiv gebunden |
| `a` | `true` |
| `a\|b={expr}` | prop-gruppe: beide bekommen denselben wert (htx) |
| `class:on={expr}` | klasse an/aus |
| `style:color={expr}` | einzelne css-eigenschaft |
| `onclick={fn}`, `on:click={fn}` | event-listener |
| `onclick='save'` | **command**: löst `rat:command` mit `{ name: 'save', event }` aus |
| `bind:value={$x}` | zwei-wege-bindung an ein signal (`value`, `checked`, `open` …) |
| `ref={fn}` / `ref={$el}` | das element an funktion oder signal |
| `{...obj}` | spread (statisch, beim erzeugen) |

## control flow

zwei gleichwertige formen: als block (`@if (…) { … }`) und als attribut (`@if={…}`),
nach dem vorbild der `n:`-attribute von latte.

### `@if`

```html
@if ($user) {
  <p>hallo {$user.name}</p>
} @else if ($loading) {
  <p>lädt …</p>
} @else {
  <button onclick='login'>login</button>
}

<p @if={$error}>{$error}</p>
```

### `@for`

```html
@for (todo of $todos) {
  <li>{todo.title}</li>
} @else {
  <li.empty>nichts zu tun</li>
}

@for (todo, index of $todos) { <li>{index + 1}. {todo.title}</li> }
@for ({ id, title } of $todos) { <li id={id}>{title}</li> }

<li @for={todo of $todos}>{todo.title}</li>
```

- `@else` greift bei leerer liste.
- elemente werden über die identität des items wiederverwendet (keyed by identity).
- *(geplant)* expliziter key: `@for (todo of $todos; key todo.id)`.

### `@switch`

```html
@switch ($view) {
  @case 'grid' { <grid-view /> }
  @case 'list' { <list-view /> }
  @default     { <p>unbekannt</p> }
}
```

### erkennung

`@if`, `@for`, `@switch` werden nur am zeilenanfang, nach whitespace oder direkt nach
einem tag erkannt. `mail@for.example` bleibt text. ein `}` schließt nur, wenn ein
block offen ist; sonst ist es text.

## script-sugar

gilt in `<script>`, `<script module>`, in jedem hole und in `.rat.js`.

### signale

```js
let   $count  = 0;            // $$.signal(0)
const $double = $count * 2;   // $$.computed(() => $count.value * 2)
$count++;                     // $count.value++
```

### pipe

```js
value |> fn            // fn(value)
value |> fn(a, b)      // fn(value, a, b)
value |> obj.method    // obj.method(value)
value |> (x => x * 2)  // (x => x * 2)(value)

const title = $todos
  |> filter(open)
  |> count
  |> format('# open');
```

der linke operand ist alles bis zum nächsten `=`, `,`, `;`, `(`, `?`, `:`, `return` …
auf derselben klammerebene. im zweifel klammern.

### `for…of` ohne deklaration

```js
for (item of items) {}       // for (const item of items) {}
```

achtung: in plain js wäre das eine zuweisung an ein äußeres `item`. in rat nie.

## `.rat.js`

plain js mit allem aus "script-sugar". zusätzlich wird jedes `html\`…\`` ohne
`${…}` als rat-markup compiliert, holes als `{…}`:

```js
let $count = 0;

export const Counter = () => html`
  <button onclick={() => $count++}>{$count}</button>
`;
```

## offen

- kommentare im markup: `<!-- -->` fällt weg. eine zeilenform (`// …` am zeilenanfang)?
- whitespace: v0 kollabiert läufe zu einem leerzeichen und entfernt reine
  zeilenumbruch-texte. `<pre>` wird *(geplant)* ausgenommen.
- positional values und `$`-shorthand-tags aus htx (`<$icon 'bx:search' />`).
- `@await (promise) { … } @then (value) { … } @catch (error) { … }`.
- `@let name = expr` im markup für lokale ableitungen.
