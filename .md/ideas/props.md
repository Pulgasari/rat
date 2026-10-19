# rat :: props

status: **open decision** ([d-13](#d-13)). today: `props.title`, reactive through getters.

see also: [rest attributes](rest-attributes.md), [solidjs.md](https://github.com/pulgasari/pulgasari.github.io/blob/main/md/webdev/libs/solidjs.md) (the same trap with destructuring)

<a id="d-13"></a>
## d-13 · props

- [ ] a) `props.title`, reactive through getters **(v0)**
- [ ] b) destructuring with `$`: `let { $title, size = 'm' } = props` → `$title` stays reactive **(rec)**: the same `$` rule as everywhere
- [ ] c) a block: `@props { title, size = 'm' }`

# anmerkung
ich kapier nich ansatzweise was du hier von mir willst. was denn überhaupt für title? hä lol
