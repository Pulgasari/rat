# RatScript

- [JSX](#jsx)

## Syntax

### Import Statements

```javascript
import from 'domina'          use * as dom;
import from 'preact'          use { render };
import from '@preact/signals' use { effect, signal };
```

### Guards

#### Assignment Guards

```javascript
function example () {
  let items = getItems();
  if (!items) return;
}
```

... write this:

```javascript
// uses !value checking
let user = fetchUser() or return;

// uses nullish checking
let user = fetchUser() ?? return;

// "do" block for extra code to run
const config = loadConfig() or return 'default_v' do logWarning();

// equivalent to
const config = loadConfig() or do { logWarning(); return 'default_v'; };
```

#### Line Guards

```javascript
return if (isBanned);
return if (hasError) do {
  cleanup();
  console.error('Fehler passiert!');
};
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

let makeNoise = match (animal) {
  'cat'   : () => meow(),
  'cow'   : () => moo(),
  'dog'   : () => woof(),
  default : () => stfu(),
};

makeNoise();
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

```javascript
cond isArray  = v => Array.isArray(v);
cond isRecord = v => Record.isRecord(v);
cond isString = v => typeof v === 'string';

let normalized = match (options) {
  isArray  : { label: options[0], value: options[1] },
  isRecord : options,
  isString : { label: options, value: options },
}
```

### Keyword: `switch`

#### Multi-Case Switch

```javascript
switch (animal) {
  'cat'         : meow();
  'dog', 'wolf' : bark();
  default       : stfu();
}
```

#### Tuple Switch

```javascript
let isBig    = true;
let myAnimal = 'dog';

switch (isBig, myAnimal) {
  (true, 'dog')  : console.log('Großer Hund');
  (true, 'cat')  : console.log('Große Katze');
  (false, 'dog') : console.log('Kleiner Hund');
  default        : console.log('Unbekannte Kombination');
}
```

#### Naked Switch

```javascript
switch {
  $score >= 90 : grade = 'A';
  $score >= 80 : grade = 'B';
  default      : grade = 'F';
}
```

### Prototype Accessor

...

```javascript
function String::shout() {
  return this.toUpperCase() + "!!!";
}
```

...

```javascript
String::replaceAll = function (a, b) {
  let res = this;
  while (res.indexOf(a) != -1) {
    res = res.replace(a, b);
  }
  return res;
};
```

Define via Arrow Function Syntax

```javascript
Array::first = () => this[0];
```

...

```javascript
Array::forEach.call([1, 2, 3], (item) => {
  console.log(item);
});
```

## JSX

A improved JSX syntax is supported.

```javascript
fn RenderPage () {
  return (
    <div class="container">
      <MyComponent [id, name]="test" theme={$theme} />
      <span>Standard HTML</span>
    </div>
  );
}
```

