# rat :: study

a closer look at libraries and languages worth understanding: what they are, which
problem they were made for, their core concepts with code, how they work inside, and
what rat can learn from them. not a list of ideas to build (that is [ideas.md](ideas.md)),
but background to think with.

- [jquery](#jquery) · [htmx](#htmx) · [lit](#lit) · [elm](#elm) · [side by side](#side-by-side)

---

## jquery

**what it is.** a javascript library from 2006 that made the dom usable. for about ten
years it was on most websites. today it is mostly legacy, but nearly every browser api
that replaced it (`querySelectorAll`, `classList`, `fetch`) exists because jquery
showed what developers wanted.

**the problem it solved.** in 2006 every browser had its own dom api, events worked
differently in internet explorer, and finding elements meant `getElementById` plus
walking the tree by hand.

### core concepts

**1. one function for everything: `$`.** a css selector in, a *wrapped set* of elements
out. every method works on all elements of the set at once:

```js
$('.card').addClass('ready');            // every .card gets the class
$('#menu li').hide();                    // every li in #menu
$('<p>hello</p>').appendTo('body');      // creating elements uses the same function
$(function () { … });                    // and so does "run when the page is ready"
```

the set is an "implicit loop": no `forEach`, no check whether anything was found. an
empty set simply does nothing.

**2. chaining.** almost every method returns the set again, so calls line up:

```js
$('.alert')
  .addClass('visible')
  .text('saved')
  .delay(2000)
  .fadeOut();
```

this is the *fluent interface* pattern, and it is where `@domina`'s
`element('#panel').addClass('open').setAttr(…)` comes from.

**3. event delegation.** one listener on a parent handles events for children, also for
children added later:

```js
$('#list').on('click', 'li.remove', function () {
  $(this).closest('li').remove();
});
```

the listener sits on `#list`. a click bubbles up from the `li.remove`, jquery checks the
selector and calls the handler with the matching element as `this`. a thousand list
items, one listener.

**4. effects and the queue.** `fadeIn`, `slideUp`, `animate({ left: 100 })`. animations
on one element wait for each other in a queue, so chained effects run one after the other.

**5. plugins.** `$.fn.tooltip = function () { … }` adds a method to every set:
`$('.help').tooltip()`. that made jquery an ecosystem (jquery ui, thousands of plugins).

**6. ajax.** `$.get('/api/users', users => …)` and `$('#box').load('/part.html')`,
long before `fetch`.

### how it works

`$('.card')` returns an object that looks like an array (`0`, `1`, `length`) and has
every jquery method on its prototype (`$.fn`). each method loops over the elements
inside and returns `this`. there is no state, no rendering: jquery changes the dom
directly, right when you call it.

### strengths and weaknesses

- **strong**: immediate, no build, no concepts to learn before the first line works.
  the selector-in, everything-happens-to-all model is extremely readable.
- **weak**: the dom *is* the state. once an app grows, nobody knows which code changed
  which element when. this "spaghetti" problem is what react, vue and signals were
  invented to solve.

### for rat

- the implicit loop and chaining live on in `@domina`. rat behaviors (`@name`) are the
  modern form of jquery plugins: a function that gets an element, but attached in the
  markup instead of found by a selector afterwards.
- event delegation is a real performance idea for long lists: a modifier like
  `on:click.delegate` or a runtime that delegates `@for` item events automatically.
- what not to take: the dom as the source of truth. in rat the state is in signals, the
  dom follows.

---

## htmx

**what it is.** a small library (about 14 kb) from 2020, the successor of intercooler.js.
it extends html with attributes so that any element can make an http request and put the
answer (html, not json) into the page. "html over the wire".

**the problem it solved.** for many apps a single page application is too much: a json
api, a client side framework, state duplicated on client and server. htmx says: let the
server render html, as it always did, and only swap the part that changed.

### core concepts

**1. any element can make a request, with any method.**

```html
<button hx-post="/clicked" hx-target="#result" hx-swap="innerHTML">
  click me
</button>
<div id="result"></div>
```

a click sends `POST /clicked`. the server answers with a piece of html, which replaces
the content of `#result`. no javascript written.

**2. triggers: when the request happens.**

```html
<input name="q" hx-get="/search" hx-trigger="keyup changed delay:300ms" hx-target="#hits">
<div hx-get="/news" hx-trigger="every 30s"></div>
<div hx-get="/more" hx-trigger="revealed"></div>       <!-- when scrolled into view -->
```

`keyup changed delay:300ms`: on keyup, only if the value changed, debounced by 300 ms.
a small language inside one attribute.

**3. targets and swaps: where the answer goes.**

```html
hx-target="#hits"          <!-- css selector -->
hx-target="closest tr"     <!-- relative: the nearest tr upwards -->
hx-swap="outerHTML"        <!-- replace the target itself -->
hx-swap="beforeend"        <!-- append (infinite lists) -->
hx-swap="innerHTML transition:true"   <!-- with a view transition -->
```

**4. out of band swaps.** one response can update several places: elements in the answer
with `hx-swap-oob="true"` and an id replace the element with the same id anywhere on the
page (a counter in the header, a notification badge).

**5. boosting.** `<body hx-boost="true">` turns every normal link and form into an ajax
request that swaps the body. a classic multi page site feels like a single page app,
with no change on the server.

**6. history.** `hx-push-url="true"` updates the url, the back button works.

**7. hyperscript (sister project).** a tiny scripting language in an attribute, for the
small client side bits htmx leaves out:

```html
<button _="on click toggle .open on #menu">menu</button>
```

### how it works

htmx scans the document for `hx-*` attributes (and watches for new ones with a
`MutationObserver`), adds listeners for the triggers, sends the request with `fetch`,
parses the html answer and swaps it in. request and response headers carry extra
information (`HX-Request`, `HX-Target`, `HX-Redirect`), so the server knows it is
answering htmx and can send just a fragment.

### strengths and weaknesses

- **strong**: no client state at all, so no sync problems. very little javascript. the
  behavior is visible in the markup. works with any server language.
- **weak**: every interaction is a round trip; offline or highly interactive interfaces
  (an editor, a drawing app) do not fit. logic is spread over attribute strings, which
  no tooling checks.

### for rat

- **behavior through attributes** is the core of htmx and of your aufbau controller
  concept, and now of rat behaviors. htmx proves how far it carries.
- **the trigger mini-language** (`keyup changed delay:300ms`, `every 30s`, `revealed`)
  is worth stealing for event modifiers: `on:input:delay(300)`, `on:revealed`,
  `@every:30s`. rat's `[keys]`, `!`, `:once` are already a step in that direction.
- **out of band updates** have a client side twin in rat: a signal used in several
  places updates all of them. same goal, opposite location.
- **zugriff** runs offline in capacitor apps, so htmx's server round trips are not an
  option there. the attribute design is the part to take, not the transport.

---

## lit

**what it is.** google's small library (about 5 kb) for writing web components, the
successor of polymer. a lit component is a real custom element (`<my-counter>`) that
works in any page and any framework.

**the problem it solved.** native custom elements are verbose: rendering, updating
attributes and properties, scheduling re-renders, all by hand. lit adds just enough to
make them pleasant, without becoming a framework.

### core concepts

**1. reactive properties.** declared properties re-render the component when they change:

```js
import { LitElement, html, css } from 'lit';

class MyCounter extends LitElement {
  static properties = { count: { type: Number } };

  constructor () { super(); this.count = 0; }

  render () {
    return html`<button @click=${() => this.count++}>${this.count}</button>`;
  }
}

customElements.define('my-counter', MyCounter);
```

`count` becomes a getter/setter pair. setting it schedules an update (batched in a
microtask), so ten changes in a row cause one render. `type: Number` converts the
`count="5"` attribute into a number.

**2. `html` tagged templates, rendered efficiently.** this is the clever part. the static
strings of a template are the same on every call, only the `${…}` values differ. lit
parses the strings once into a `<template>`, remembers where the holes are, and on later
renders only compares and updates the values in the holes. no vdom, no diffing of trees.

```js
html`<p class=${cls}>${text}</p>`
//   ^^^^^^^^^ static, parsed once   ^^^^ only these are checked on re-render
```

rat's planned `dom:clone` target is the same idea, done at compile time instead of at
first render.

**3. binding prefixes in the template.**

```js
html`
  <input .value=${text}>             <!-- . sets the property, not the attribute -->
  <button ?disabled=${busy}>         <!-- ? a boolean attribute: present or absent -->
  <button @click=${save}>            <!-- @ an event listener -->
`
```

three characters, three kinds of binding. rat solves the same with a list of known
properties (`value`, `checked`) and `bind:`.

**4. directives.** functions that control how a hole is rendered:

```js
html`${repeat(items, item => item.id, item => html`<li>${item.name}</li>`)}`  // keyed list
html`<div class=${classMap({ active, disabled })}>`                           // class toggles
html`${until(fetchData(), html`loading …`)}`                                   // a promise
html`${guard([items], () => expensive(items))}`                                // memoize
```

**5. scoped styles through shadow dom.**

```js
static styles = css`button { color: crimson; }`;
```

the component's shadow root isolates its markup and styles: page css does not leak in,
component css does not leak out. the styles are a shared, constructed stylesheet
(`adoptedStyleSheets`), parsed once for all instances.

**6. reactive controllers.** reusable pieces of behavior that hook into a component's
lifecycle (`hostConnected`, `hostUpdate`), e.g. a `MouseController` that tracks the
pointer and requests a re-render. lit's answer to react hooks.

**7. context and ssr.** `@lit/context` passes values down the tree without props, and
`@lit-labs/ssr` renders components on the server with declarative shadow dom.

### strengths and weaknesses

- **strong**: built on platform standards, so the result is just custom elements.
  tiny, fast, no build needed. good for design systems used across frameworks.
- **weak**: shadow dom makes global styles and forms awkward (a form does not see
  inputs inside a shadow root without extra work). re-rendering is per component,
  coarser than signals.

### for rat

- **the template caching idea** confirms the `dom:clone` target: static parts once,
  holes tracked by position.
- **`.prop` / `?attr` / `@event`** is a compact binding vocabulary. rat chose `on:` and
  `@` for behaviors, but `?disabled` style booleans are worth a thought.
- **directives** map onto rat: `repeat` is `@for` (keyed), `classMap` is `class:x`,
  `until` is `@await`.
- **custom elements as output**: a rat component compiled into a lit-like custom element
  (`@rat/elements`, planned in the concept) would make rat components usable in any page.
  your aufbau elements are custom elements already.

---

## elm

**what it is.** a functional language that compiles to javascript, created in 2012 by
evan czaplicki for web apps. it is small, strict and known for its compiler.

**the problem it solved.** javascript apps crash at runtime (`undefined is not a
function`), and state changes come from everywhere. elm's promise: **no runtime
exceptions** in practice, and one clear way for data to flow.

### core concepts

**1. the elm architecture (tea): model, update, view.** every elm app has exactly this
shape:

```elm
-- the state of the whole app, one value
type alias Model = { count : Int }

init : Model
init = { count = 0 }

-- everything that can happen, as a closed list
type Msg = Increment | Decrement | Reset

-- the only place the state changes: old state + message -> new state
update : Msg -> Model -> Model
update msg model =
  case msg of
    Increment -> { model | count = model.count + 1 }
    Decrement -> { model | count = model.count - 1 }
    Reset     -> { model | count = 0 }

-- the interface is a function of the state
view : Model -> Html Msg
view model =
  div []
    [ button [ onClick Decrement ] [ text "-" ]
    , text (String.fromInt model.count)
    , button [ onClick Increment ] [ text "+" ]
    ]
```

the view never changes anything. a click produces a `Msg`, elm passes it to `update`,
which returns a new model, and the view is computed again from it. redux (react) is
this architecture copied into javascript.

**2. everything is immutable.** `{ model | count = 5 }` creates a new record. nothing is
ever changed in place, so no code can change data behind another code's back.

**3. custom types and exhaustive `case`.** a type lists every shape a value can have:

```elm
type RemoteData
  = NotAsked
  | Loading
  | Failure String
  | Success (List User)

view data =
  case data of
    NotAsked      -> text ""
    Loading       -> text "loading …"
    Failure error -> text ("failed: " ++ error)
    Success users -> ul [] (List.map viewUser users)
```

if one branch is missing, the program does not compile. "forgot the loading state" is a
compile error, not a bug in production. this is the strongest form of the pattern
matching in [ideas.md 2.5](ideas.md#25-pattern-matching-rescript) and the named cases in
[ideas.md 5](ideas.md#5-named-cases).

**4. no null, no exceptions.** a value that may be missing is a `Maybe` (`Just x` or
`Nothing`), an operation that may fail returns a `Result` (`Ok x` or `Err e`). the type
forces you to handle both cases.

**5. effects as data.** a function cannot fetch or read the clock. instead `update`
returns a *command* that describes the effect, and the runtime performs it and sends
the result back as a message:

```elm
update msg model =
  case msg of
    Load      -> ( { model | data = Loading }, Http.get { url = "/users", expect = Http.expectJson Loaded usersDecoder } )
    Loaded r  -> ( { model | data = fromResult r }, Cmd.none )
```

**6. decoders: json is checked at the border.** data from outside (http, local storage)
goes through a decoder that either produces a correct value or a clear error. inside
the app, data is always well formed.

```elm
userDecoder = Decode.map2 User (field "name" string) (field "age" int)
```

**7. the friendly compiler.** elm's error messages are famous: they explain the problem
in sentences, point at the code and suggest a fix.

```
The 1st argument to `viewUser` is not what I expect:

42|     viewUser model.name
                 ^^^^^^^^^^
This `name` field is a: String
But `viewUser` needs the 1st argument to be: User

Hint: Did you mean model.user?
```

**8. the pipe.** elm has `|>` too: `users |> List.filter .active |> List.map .name`.
note `.active`: a property name with a dot is a function that reads it (pluck again).

### how it works

the compiler checks types across the whole program (with inference, so you rarely write
types), then emits javascript. the runtime holds the one model, runs `update` for each
message, calls `view`, and patches the dom through a virtual dom diff.

### strengths and weaknesses

- **strong**: refactoring without fear, almost no runtime errors, one obvious place for
  every state change, the best error messages of any compiler.
- **weak**: talking to javascript goes through "ports" (message passing), which is
  cumbersome. a small ecosystem, slow release cycle, and the strict architecture feels
  heavy for small things.

### for rat

- **`@rat/types` decoders**: elm's decoders are exactly the "schemas validate at the
  boundary" idea of rat's types concept. data from storage, network or a worker goes
  through a schema once; inside it is trusted.
- **exhaustive matching** over a closed set of cases: a `@switch` over the cases of a
  schema (`Enum`, or named cases) could warn about a missing branch at compile time.
- **remote data as a type** (`NotAsked | Loading | Failure | Success`) is the shape
  `@await` should support well.
- **error messages**: rat's compiler already gives file, line and column. elm sets the
  bar for the next step: say what was expected, what was found, and suggest the fix.
- what not to take: one global model and messages for everything. rat's signals give
  fine-grained updates without that ceremony.

---

## side by side

| | jquery | htmx | lit | elm |
|---|---|---|---|---|
| where the state lives | in the dom | on the server | in component properties | one immutable model |
| how the page updates | you change the dom | the server sends html, htmx swaps it | the template re-renders, only holes are checked | vdom diff after every update |
| what you write | selectors and method chains | html attributes | classes with `html` templates | a typed functional language |
| build needed | no | no | no | yes (the elm compiler) |
| the idea to keep | implicit loops, chaining, delegation | behavior in attributes, trigger language | static template parts parsed once, directives | exhaustive cases, decoders, error messages |
