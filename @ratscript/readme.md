# RatScript

- [Aliasing](#as)
- [Import Statements](#)
- [Functions](#functions)
  - [Named Arguments](#named-arguments)
- [Operators](#operators)
  - [Assignment Operator](#assignment-operator)
  - [Pipe Operator](#pipe-operator)
- [Control Flow](#control-flow)
  - [cond](#)
  - [match](#)
  - [switch](#)
- [Guards](#guards)
  - [Assignment Guards](#assignment-guards)
  - [Line Guards](#line-guards)
- [Types](#types)
  - [Enum](#enum)
  - [List](#list)
  - [Record](#record)
  - [Struct](#struct)
  - [Tuple](#tuple)
  - [Union](#union)
- [JSX](#jsx)
- [](#)

## Import Statements

RatScript provides an alternative Import Syntax.

```javascript
import from 'domina'          use * as dom;
import from 'preact'          use { render };
import from '@preact/signals' use { effect, signal };
```

## Guards

#### Assignment Guards

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

## Pipe Operator

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

## Named Arguments

## Keyword: `cond`

## Keyword: `match` and `switch`

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

## Keyword: `match`

`match` is similar to `switch` but for assignment. It was mostly inspired the equivalent from PHP.

#### Basic Match

```javascript
let sound = match (animal) {
  'cat'   : 'meow',
  'dog'   : 'woof',
  default : 'silent'
};
```

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
let pageType = 'profile';

let pageData = match (pageType) {
  'profile' : await fetchProfileData($userId),
  'settings': await fetchSettings(),
  default   : { title: 'Default Page' }
};
```

#### Naked Match

If no `(...)` is provided it implicitly matches against `true`.

```javascript
let access = match {
  isBanned    : 'no-entry',
  isAdmin     : 'full-access',
  default     : () => console.log('Fallback geladen!') // Lazy default evaluation
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

#### Tuple Match

```javascript
let status = match (isLogged, userRole) {
  (true, 'admin') : await fetchAdminDashboard(),
  (true, 'user')  : 'User Home',
  default         : 'Login Page'
};
```

## Keyword: `switch`

**RatScript** provides an improved `switch` syntax.

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

## Prototype Accessor

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

## Aliasing (`as`)

#### Conditional Binding

```javascript
if (something as sth) ...
```

#### Destructuring Alias

```javascript
const { something as sth } = namespace;
```

## Multiline Strings

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

## Types

### List

Lists are improved and type-checked arrays for values of the same type.

```javascript
let animals = #['cat', 'dog', 'fish'];

let numbers = #[1, 2, 3, 4, 5];
```

For more informations about Lists read [here](#).

### Enum

### Record

### Struct

### Tuple

### Union


