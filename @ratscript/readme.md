# RatScript

## Syntax

### Import Statements

```javascript
import from 'domina'          use * as dom;
import from 'preact'          use { render };
import from '@preact/signals' use { effect, signal };
```

### Guards

Instead of writing sth. like this ...

```javascript
function example () {
  let items = getItems();
  if (!items) return;
}
```

... write this:

```javascript
function example () {
  let items = getItems() or return;
}
```

### Multiline Comments

Instead of writing sth. like this ...

```javascript
let html = `<div>
  <div>...</div>
  <div>...</div>
  <div>...</div>
</div>
```

... write this

````javascript
let html = ```
            <div>
              <div>...</div>
              <div>...</div>
              <div>...</div>
            </div>
            ```;
````

### Pipe Operator

Instead of writing sth. like this ...

```javascript
let bla = muh(meene(eene('Some Example')));
```

... write this:

```javascript
//
let bla = 'Some Example' |> eene() |> meene() |> muh();

// implicit notation
let bla = 'Some Example' |> eene |> meene |> muh;

// explicit notation
let bla = 'Some Example' |> eene(#) |> meene(#) |> muh(#);
```

### Named Arguments

### Keyword: `cond`

### Keyword: `match` and `switch`

RatScript provides an improved `switch` syntax and also a `match` (similar to PHP).

```javascript
let animal = 'cat';

let sound = match (animal) {
  'cat'   : () => meow(),
  'cow'   : () => moo(),
  'dog'   : () => woof(),
  default : () => stfu(),
};
```

```javascript
cond isAdmin     = $userRole   === 'admin';
cond isModerator = $userRole   === 'mod';
cond isBanned    = $userStatus === 'banned';

let accessPermission = match {
  isBanned    : 'no-entry',
  isAdmin     : 'full-access',
  isModerator : 'limited-access',
  default     : 'guest-access'
};
```

```javascript
let pageType = 'profile';

let pageData = match (pageType) {
  'profile' : await fetchProfileData($userId),
  'settings': await fetchSettings(),
  default   : { title: 'Default Page' }
};
```

```javascript
let themeInput = 'neon-green';

let activeTheme = match (themeInput) {
  'light' : 'theme-white',
  'dark'  : 'theme-black',
  default : () => {
    console.warn(`Unknown Theme: ${themeInput}. Use Fallback.`);
    return 'theme-standard';
  }
};
```


