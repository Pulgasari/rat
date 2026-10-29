# DOM

`RAT.dom` is `@domina/dom`: called it is a chain over elements (like `$` of jquery), as an object it reads like `document`.

```js
RAT.dom.title = 'notes';                              // as on document
RAT.dom.meta.description = 'my notes';
RAT.dom.querySelector({ tag: 'li', class: 'done' });   // a spec object where a selector goes

RAT.dom('.card').addClass('seen').style({ opacity: 1 });
RAT.dom(button).on('click', save);                    // returns the stop
```

## Events of rat's elements

`<rat-app>`, `<rat-view>`, `<rat-area>` and `<rat-part>` have `on()` for their own events. The handler gets the value, not an event, and `on()` returns the stop:

```js
RAT.app.on('error', error => toast.error(error));
RAT.app.on('navigate', ({ from, to }) => track(to));

view.on('leave', async event => { if (!await confirm()) event.preventDefault(); });
```

The same events as dom events go through `RAT.dom`:

```js
RAT.dom(view).on('rat:enter', event => …);
```

## In markup

```rat
<input ref={$field} />                         <!-- the element, into a signal -->
<textarea @autosize></textarea>                <!-- a behavior: autosize(element) -->
<form on:submit!={save}>                       <!-- ! is preventDefault() -->
<input on:keydown[ctrl+enter]={send} />        <!-- only for those keys -->
<button on:click:once={init}>                  <!-- once, then gone -->
```

A behavior is a function `(element, value) => cleanup`; it runs once the element exists and again when its value changes.
