# Getting started

rat is a small framework for apps in the browser, without a build step. You write components in `.rat` files: markup first, a `<script>` for the logic, a `<style>` for the looks. The page compiles them when it loads them.

## A page

```html
<!DOCTYPE html>
<html>
<head>
  <script src='rat/packages/app/run/run.js'></script>
</head>
<body>
  <rat-app src='app.rat.html'></rat-app>
</body>
</html>
```

`run.js` writes the import map and defines `<rat-app>`. `src` names the component of the app.

## A component

```rat
<script>
  let $count = 0;
</script>

<button onclick={() => $count++}>clicked {$count} times</button>
```

- a name with `$` is a signal: reading it in the markup keeps that spot up to date.
- `{…}` is a hole: any expression, live.
- no build, no bundler: the file is compiled in the page and cached.

## Next

- [Components](#/components): files, props, children
- [Signals](#/signals): state that updates the markup
- [Control flow](#/control-flow): `@if`, `@for`, `@match`
- [Types](#/types): schemas and reactive data types
