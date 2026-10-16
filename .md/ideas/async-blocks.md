# rat :: async blocks

status: **idea**, syntax is an **open decision** ([d-28](#d-28)).

see also: [with chains](with-chains.md); solidjs.md and svelte.md in `pulgasari.github.io/md/webdev/libs/` (both move towards `await` in the reactive graph instead of a block)

## idea: `@await` (from svelte)

**origin.** svelte renders the three states of a promise directly in markup:

```svelte
{#await fetchUser(id)}
  <p>loading …</p>
{:then user}
  <p>hello {user.name}</p>
{:catch error}
  <p>failed: {error.message}</p>
{/await}
```

**problem.** loading, success and error otherwise need three signals and an `@if`
chain, written by hand for every fetch.

**in rat.** in all three body forms, like `@if`:

```html
@await (fetchUser($id))
  <p>loading …</p>
@then (user)
  <p>hello {user.name}</p>
@catch (error)
  <p>failed: {error.message}</p>
```

because the promise expression reads `$id`, a new id starts a new request
automatically, and an outdated answer is dropped.

**cost.** medium: a new runtime block (`$$.wait`) that keeps track of which promise is
the current one.

<a id="d-28"></a>
## d-28 · async blocks: the syntax

```html
<!-- a) three keywords, like @if / @else -->
@await (load($id))
  <p>loading …</p>
@then (user)
  <p>{user.name}</p>
@catch (error)
  <p>{error.message}</p>

<!-- b) the value named in the head, pending and failure as clauses -->
@await (user of load($id))
  <p>{user.name}</p>
@pending
  <p>loading …</p>
@catch (error)
  <p>{error.message}</p>

<!-- c) a for-like head, no pending branch: shows nothing until the value is there -->
@await (user of load($id)): <p>{user.name}</p>
```

- [ ] a) `@await` / `@then` / `@catch`
- [ ] b) the value in the head, `@pending` and `@catch` as clauses **(rec)**: the main case comes first, and `user of …` reads like `@for`
- [ ] c) only the short form
- [ ] d) b, with c as the one-line form

## notes

ja, aber genaue syntax mir noch unklar.

**reply:** three variants side by side in [d-28](#d-28).
