# rat :: ideas

one file per topic: where the idea comes from, how it could look in rat, what it costs, and
the decisions that belong to it, right there. tick one box per decision (`- [x]`), add a note
below it if needed, and it gets built that way. **(v0)** marks what the prototype does
today, **(rec)** the recommendation. a decided entry stays in its file, with what was built.

## open decisions

| | decision | file |
|---|---|---|
| d-10 | further pipe operators (now with option e: only `\|>` and `\|?>`) | [pipes](pipes.md#d-10) |
| d-13 | props | [props](props.md#d-13) |
| d-15 | the index in `@for` | [loop metadata](loop-metadata.md#d-15) |
| d-16 | commands with arguments in markup | [app](app.md#d-16) |
| d-19 | `@scope` lower boundary (question about the `>`) | [styles](styles.md#d-19) |
| d-26 | behaviors: `@name` or `use:name` | [behaviors](behaviors.md#d-26) |
| d-28 | async blocks: the syntax | [async blocks](async-blocks.md#d-28) |
| d-29 | filters on loops: the syntax | [loop filters](loop-filters.md#d-29) |
| d-30 | patterns written straight into a `@case` | [pattern matching](pattern-matching.md#d-30) |

## all topics

| topic | status | from |
|---|---|---|
| **markup and control flow** | | |
| [block syntax](blocks.md) | built (d-01 to d-04) | |
| [loop metadata](loop-metadata.md) | idea, d-15 open | latte |
| [local names](local-names.md) | idea | svelte |
| [async blocks](async-blocks.md) | idea, d-28 open | svelte |
| [loop filters](loop-filters.md) | idea, d-29 open | haskell |
| [pattern matching](pattern-matching.md) | named cases built, d-30 open | rescript, f#, raku |
| [fragments](fragments.md) | built (d-27) | svelte |
| [markup shorthands](markup-shorthands.md) | ideas | imba, ruby, kotlin |
| **attributes and events** | | |
| [event modifiers](event-modifiers.md) | built (d-24, d-25), word modifiers idea | vue |
| [binding modifiers](binding-modifiers.md) | idea | vue |
| [rest attributes](rest-attributes.md) | built | laravel blade, htx |
| [behaviors](behaviors.md) | built, d-26 open | svelte, lit |
| [transitions](transitions.md) | idea | svelte |
| **components** | | |
| [props](props.md) | d-13 open | |
| [slots](slots.md) | idea | web components, latte |
| [parts and lazy components](parts.md) | idea, prototype `htx-part` | astro, `@htx/elements` |
| **script and data** | | |
| [pipes](pipes.md) | `\|>` built (d-08, d-09), d-10 open | f#, elixir, clojure, gleam |
| [ranges](ranges.md) | built (d-05 to d-07) | |
| [types](types.md) | built (d-14), `@rat/types` v0 | |
| [reactivity](reactivity.md) | built as `@rat/signals` (d-23 c, d-31 a, d-32 b) | alien-signals, svelte, vue |
| [value wrappers](value-wrappers.md) | idea | swift |
| [junctions](junctions.md) | idea | raku |
| [with chains](with-chains.md) | idea | elixir, gleam, f# |
| [templates in js](templates-in-js.md) | built (d-11, d-12) | |
| **app, styles, tooling** | | |
| [app](app.md) | d-16 open, d-17 and d-18 decided | |
| [styles](styles.md) | built (d-20), d-19 open | |
| [no build](no-build.md) | idea | `@htx/elements/load.js` |
| [comptime](comptime.md) | idea | zig |
| [tooling](tooling.md) | idea | laravel artisan |

## shortlist

small, local, and they fit the existing syntax:

1. [binding modifiers](binding-modifiers.md) and the word [event modifiers](event-modifiers.md) (`.stop`, `.outside`, `.debounce`)
2. [loop metadata](loop-metadata.md) and `@sep`, with `$loop` settling d-15
3. [`@let`](local-names.md)
4. [loop filters](loop-filters.md)
5. [named slots](slots.md)
6. `@switch` with ranges, lists and regexes as cases ([pattern matching](pattern-matching.md#raku-smart-matching-with-given--when))
7. `.class={…}` as the short class toggle ([markup shorthands](markup-shorthands.md))
8. `?|>`, the nil-safe pipe, and `any(…)` / `all(…)` ([pipes](pipes.md), [junctions](junctions.md))

larger, but worth it: [`@await`](async-blocks.md), [parts](parts.md) with [no build](no-build.md),
[transitions](transitions.md), [`comptime`](comptime.md), [`with`](with-chains.md), [value wrappers](value-wrappers.md).

## notes

your notes stay in the file of their topic, under **notes**, with the replies.
