# rat :: no build

status: **in the page: built** as [`@rat/app`](../../packages/app) (`run.js`, `<rat-app>`, `<rat-part>`). no `resolve` hook in the compiler was needed: the loader parses the compiled code with acorn and rewrites its imports. the service worker is not built.

see also: [parts](parts.md), [styles](styles.md) (d-20), [tooling](tooling.md), [comptime](comptime.md)

the goal: a plain html page, an import map, `.rat` files next to it, and nothing else. no
node, no bundler. two ways to get there, and both share one problem: a compiled module that
imports other files.

## through a service worker

```js
// a page without a build
import Card from './card.rat';
```

a service worker answers the request for `card.rat` with the compiled module. relative
imports inside it (`./item.rat`) go through the worker as well, bare ones
(`@rat/runtime`) through the page's import map. the one blocker: workers have no import
maps, so the compiler's own `import 'acorn'` fails there. the fix is a bundled
`sw.js` (esbuild, the way the acode plugin is built), with acorn inside.

the advantage: a normal `import` works, the module has a real url, so relative imports and
source maps behave as in a build. the cost: a service worker to install, and the first load
of a page waits for it.

## in the page: fetch, compile, import from a blob url

what `@htx/elements/load.js` does for `.htx` files, and what a `<rat-part>` ([parts](parts.md))
would do without a worker:

1. **fetch** the source, **compile** it (`@rat/compiler`, `compileAsync` for style languages).
2. **import** the result from a blob url (`URL.createObjectURL(new Blob([code], { type: 'text/javascript' }))`).
3. a blob module has no path of its own, so a relative import inside it would resolve
   against `blob:` and fail. the trick from `load.js`: compile **twice**. the first pass only
   collects the specifiers (through a `resolve` hook of the compiler) and makes them absolute
   against the file's url. the `.rat` files among them are loaded the same way first, and the
   second pass writes their blob urls into the imports. everything else becomes an absolute url,
   bare specifiers stay for the import map.
4. **cache** per url (one compile per file), and drop a failed entry so the next try loads again.
5. append `//# sourceURL=<file>.js` so devtools show the file name instead of a blob id.

rat's compiler has no `resolve` hook yet; it would be one option on `compile()`, called for
every import specifier, returning the one to write.

## shared problems

- **acorn in the browser.** the compiler needs it; in the page it comes through the import
  map (`https://esm.sh/acorn@8`), in a worker it has to be bundled.
- **cost of compiling at runtime.** fine for development and small sites. for production, the
  same files go through a build adapter (or `rat build`, [tooling](tooling.md)) and the page
  loads compiled modules; nothing in the files changes.
- **circular imports between `.rat` files** would deadlock the two-pass resolution; a worker
  does not have that problem, the in-page loader needs a guard.
