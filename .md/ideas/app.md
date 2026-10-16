# rat :: app: commands, router, packages

status: commands with arguments: **open decision** ([d-16](#d-16)). router and package split: decided (d-17, d-18).

see also: [concept.md 6](../concept.md#6-app-commands-hotkeys-router); hyperapp.md in `pulgasari.github.io/md/webdev/libs/` (`[Action, payload]`, the shape of d-16 b)

<a id="d-16"></a>
## d-16 · commands with arguments in markup

- [ ] a) `onclick='open:settings'` (name, colon, argument)
- [ ] b) `onclick={['open', 'settings']}`
- [ ] c) a `command` attribute next to the handler: `command='open' value='settings'` (closer to the invoker commands api)

<a id="d-17"></a>
## d-17 · router → **a registry now, file based later (scheme open)**

<a id="d-18"></a>
## d-18 · `@rat/core` and `@rat/runtime` → **separate**
