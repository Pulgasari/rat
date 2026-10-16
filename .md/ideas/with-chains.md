# rat :: with chains

status: **idea**.

see also: [async blocks](async-blocks.md)

## elixir: `with`, a chain of steps that stops at the first failure

```elixir
with {:ok, user}  <- fetch_user(id),
     {:ok, posts} <- fetch_posts(user),
     {:ok, html}  <- render(posts) do
  html
else
  {:error, reason} -> "failed: #{reason}"
end
```

each line only continues if its result matches the pattern on the left. the first one
that does not match jumps to `else`.

**problem.** loading data in several dependent steps (user, then their posts, then a
render) ends up as nested ifs or a try/catch around everything, where it is unclear
which step failed.

**in rat.** in a script, as a block that reads top to bottom:

```js
with {
  user  of fetchUser($id);
  posts of fetchPosts(user);
} then {
  $posts = posts;
} else (error) {
  $error = error.message;
}
```

`of` awaits the promise, a rejection or a `null` jumps to `else`.

**cost.** medium: new script syntax, compiled to an async function with early returns.

## gleam: `use`, flattening callbacks

```gleam
use user <- try(fetch_user(id))
use posts <- try(fetch_posts(user))
render(posts)
```

each `use` line turns everything below it into the callback of the call on its right.
no nesting, no pyramid.

**in rat.** the same problem as elixir's `with` (above), a second shape for it. for
promises, js's own `await` already does this, so the value for rat is in the
non-promise cases (results, nulls).

**cost.** medium, as `with`.

## f#: computation expressions

**idea: computation expressions.** `async { … }`, `seq { … }`, `result { … }`: one
block syntax, the meaning of `let!` inside depends on the builder. too large for rat,
but it explains why a single `with` block can cover promises, nulls and errors
alike.
