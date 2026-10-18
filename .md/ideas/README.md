# rat :: ideas

one file per topic: where the idea comes from, how it could look in rat, what it costs, and the decisions that belong to it, right there.

tick one box per decision (`- [x]`), add a note below it if needed, and it gets built that way. **(v0)** marks what the prototype does today, **(rec)** the recommendation.

a decided entry stays in its file, with what was built.

## open decisions

- <a id="d-01"></a>**d-01** · one-line blocks need the `:` → yes · [ideas/blocks](ideas/blocks.md#d-01)
- <a id="d-02"></a>**d-02** · a one-line body ends at the line end or at `@else` / `@case` / `@default` → yes · [ideas/blocks](ideas/blocks.md#d-02)
- <a id="d-03"></a>**d-03** · several directives on one line → allowed · [ideas/blocks](ideas/blocks.md#d-03)
- <a id="d-04"></a>**d-04** · tabs and spaces mixed in one indented block → an error · [ideas/blocks](ideas/blocks.md#d-04)
- <a id="d-05"></a>**d-05** · range forms → inclusive `a..b` only · [ideas/ranges](ideas/ranges.md#d-05)
- <a id="d-06"></a>**d-06** · ranges work everywhere script sugar works → yes · [ideas/ranges](ideas/ranges.md#d-06)
- <a id="d-07"></a>**d-07** · what a range is → a lazy range type with array methods · [ideas/ranges](ideas/ranges.md#d-07)
- <a id="d-08"></a>**d-08** · the pipe placeholder → `#`, provisionally · [ideas/pipes](ideas/pipes.md#d-08)
- <a id="d-09"></a>**d-09** · `x |> f()` → `f()(x)` · [ideas/pipes](ideas/pipes.md#d-09)
- <a id="d-10"></a>**d-10** · further pipe operators · **open** · [ideas/pipes](ideas/pipes.md#d-10)
- <a id="d-11"></a>**d-11** · the template tag in `.rat.js` → `html`, `htx` and `rat` · [ideas/templates-in-js](ideas/templates-in-js.md#d-11)
- <a id="d-12"></a>**d-12** · `{…}` holes in plain `.js` files → no · [ideas/templates-in-js](ideas/templates-in-js.md#d-12)
- <a id="d-13"></a>**d-13** · props · **open** · [ideas/props](ideas/props.md#d-13)
- <a id="d-14"></a>**d-14** · type notation in scripts → a schema as the initial value · [ideas/types](ideas/types.md#d-14)
- <a id="d-15"></a>**d-15** · the index in `@for` · **open** · [ideas/loop-metadata](ideas/loop-metadata.md#d-15)
- <a id="d-16"></a>**d-16** · commands with arguments in markup → brackets, `go[settings]` · [ideas/app](ideas/app.md#d-16)
- <a id="d-17"></a>**d-17** · router → a registry now, file based later · [ideas/app](ideas/app.md#d-17)
- <a id="d-18"></a>**d-18** · `@rat/core` and `@rat/runtime` → separate · [ideas/app](ideas/app.md#d-18)
- <a id="d-19"></a>**d-19** · `@scope` lower boundary · **open** · [ideas/styles](ideas/styles.md#d-19)
- <a id="d-20"></a>**d-20** · style languages → `scss` and `ass` out of the box · [ideas/styles](ideas/styles.md#d-20)
- <a id="d-23"></a>**d-23** · mutating `$` arrays and objects → reactive variants (`$List`) · [ideas/reactivity](ideas/reactivity.md#d-23)
- <a id="d-24"></a>**d-24** · `preventDefault()` → `!` · [ideas/event-modifiers](ideas/event-modifiers.md#d-24)
- <a id="d-25"></a>**d-25** · once / n times → all three forms for now · [ideas/event-modifiers](ideas/event-modifiers.md#d-25)
- <a id="d-26"></a>**d-26** · behaviors: `@name` or `use:name` · **open** · [ideas/behaviors](ideas/behaviors.md#d-26)
- <a id="d-27"></a>**d-27** · markup fragments with parameters → `@fragment` · [ideas/fragments](ideas/fragments.md#d-27)
- <a id="d-28"></a>**d-28** · async blocks: the syntax · **open** · [ideas/async-blocks](ideas/async-blocks.md#d-28)
- <a id="d-29"></a>**d-29** · filters on loops: the syntax · **open** · [ideas/loop-filters](ideas/loop-filters.md#d-29)
- <a id="d-30"></a>**d-30** · pattern matching: patterns in `@case` · **open** · [ideas/pattern-matching](ideas/pattern-matching.md#d-30)
- <a id="d-31"></a>**d-31** · the name of the signal package → `@rat/signals` · [ideas/reactivity](ideas/reactivity.md#d-31)
- <a id="d-32"></a>**d-32** · the core → alien-signals behind a facade · [ideas/reactivity](ideas/reactivity.md#d-32)

## all topics

### built
[behaviors](behaviors.md)
[block syntax](blocks.md)
[event modifiers](event-modifiers.md)
[fragments](fragments.md)
[local names](local-names.md)
[no build](no-build.md)
[pattern matching](pattern-matching.md)
[parts and lazy components](parts.md)
[pipes](pipes.md)
[ranges](ranges.md)
[reactivity](reactivity.md)
[rest attributes](rest-attributes.md)
[styles](styles.md)
[templates in js](templates-in-js.md)
[types](types.md)
 
### open
[app](app.md)
[async blocks](async-blocks.md)
[binding modifiers](binding-modifiers.md)
[comptime](comptime.md)
[junctions](junctions.md)
[loop filters](loop-filters.md) 
[loop metadata](loop-metadata.md)
[markup shorthands](markup-shorthands.md)
[props](props.md)
[service worker]
[slots](slots.md)
[tooling](tooling.md) 
[transitions](transitions.md)
[value wrappers](value-wrappers.md)
[with chains](with-chains.md)

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
