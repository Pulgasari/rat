# RAT :: todo

## `@rat/app`
- [ ] move `/store.js` to `/modules/store.js`
- [ ] create module drivers:
  - [ ] database
  - [ ] dialogs
  - [ ] external
  - [ ] files
  - [ ] folders
  - [ ] hotkeys
  - [ ] notifications
  - [ ] thumbnails

## syntax | schema | types
- [ ] the "comptime" idea from [ideas.md](ideas.md)
- [ ] extend schema for elements-hints (control-elements)
- [ ] extend schema for persistence

---

# not for now

## `@rat/app`
- [ ] error boundary: eigene fehleranzeige (z.b. `<template slot="error">`)
- [ ] `<rat-overlay>` auf `<dialog>` (modernes html nutzen: top layer, inert, escape)
- [ ] `<rat-overlay>` ebenso per `name` umschalten

## sonstiges
- [ ] `@rat/bunker` nach `@bunker` umziehen, sobald es sich in den apps bewährt hat
- [ ] props an signals andocken (optional, ohne dass domina fest an `@rat/signals` hängt)

---

## element-hints as part of a schema

schemas bilden werte ab.
types sind werte/objekte.
werte als ganzes bilden data.

jeder wert hat in einer ui potentiell min. eine darstellungsform (output) sowie eine erstellungsform (input).

```html
// input
<textarea>...</textarea>

// output
<article>
  <h1>...</h1>
  <p>...</p>
  <p>...</p>
</article>
```

je nachdem inwiefern eine library oder framework gibt es für verschiedene werte unterschiedliche elemente/komponenten.

```js
const aboutMe = new RAT.Text (...);
const inputElement  = aboutMe.el.input;
const outputElement = aboutMe.el.output;
```
