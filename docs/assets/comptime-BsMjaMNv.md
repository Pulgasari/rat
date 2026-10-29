# comptime

`<script comptime>` runs while the file is compiled, not in the page. What its top-level `const` and `let` hold is baked into the module as data; the code and its imports are not.

```rat
<script comptime>
  import { use } from '@gestalt/patterns';

  const dots  = await use('dots', { fg: '#f00', size: 12 }).image();
  const icons = await read('./icons.json', 'json');
</script>

<div style:background-image={dots}>
  @for (icon of icons): <svg-icon icon={icon.name} />
</div>
```

The module then only holds:

```js
const dots  = "url(\"data:image/svg+xml,…\")";
const icons = [{ "name": "add" }, …];
```

- plain js: no `$` names (a baked value never changes), no `export`. top-level `await` works.
- `read(path, as)` reads a file next to the component, `'text'` (default) or `'json'`.
- a value is data: json, `Date`, `RegExp`, `URL`, `Map`, `Set`, typed arrays, `BigInt`. A function, a class instance or a dom node is a compile error.
- no dom: what makes a string works (`image()`), what touches the page does not.
- in a build it runs in vite (bare imports through the import map); without a build in the page right before the file compiles.
