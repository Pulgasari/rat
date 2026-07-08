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

- Keywords
  - Statement Introducer Keywords
    - alias, struct
  - Infix Keywords
    - is

---

## Aliasing (`as` and `alias`)

#### Conditional Binding

```javascript
if (something as sth) ...
```

#### Destructuring Alias

```javascript
const { something as sth } = namespace;
```

#### Function Aliases

The `alias` keyword is used to create aliases for functions.

If the aliased function is part of an object, the compiler auto-binds it to keep the original `this` context intact.

```javascript
// local function
function sayHello() { return "Hi"; }

// deep object with 'this' dependency
const database = {
  prefix: "User: ",
  users: {
    save (data) {
      return this.prefix + data.name;
    }
  }
};

// create aliases
alias sayHello as hello;
alias database.users.save as saveUser; // with auto-binding to keep 'this' context
```

---

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

## Operators

RatScript has the same operators as JavaScript but additionally it adds an [Pipe Operator](#pipe-operator) `|>` and improves the [Assignment Operator](#assignment-operator) `+=` to be more universal.

### Assignment Operator

```javascript
let greeting = '';

greeting += 'Good';
greeting += ' morning,';
greeting += ' darling!';
```

This works also on Arrays, [Lists](#list), Objects, Sets and Maps.

#### Assign to Arrays

```javascript
let animals = ['bird', 'cat', 'dog'];

animals += 'fish';
animals += 'monkey';
```

#### Assign to Objects

```javascript
let person = { name: 'Udo', age: 60 };

person += { age: 61, country: 'Germany'};
```

It's the equivalent to:

```javascript
// JavaScript
let person = { name: 'Udo', age: 60 };

Object.assign(person, { age: 61, country: 'Germany'});
```

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

```javascript
// Convert Types
let sth = getNumber() |> String;
let age = '28' |> Number; // Number('28')
let True = 1 |> Boolean;  // Boolean(1)

// Mathematische Transformationen
let rounded = 4.7 |> Math.round; // Math.round(4.7)
let absolute = -10 |> Math.abs;  // Math.abs(-10)

// Fast Debugging at End of Chain
let user = fetchUser()
  |> formatData(#)
  |> console.log;
// console.log(formatData(fetchUser()))
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


