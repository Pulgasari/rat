# rat

https://pulgasari.github.io/rat/

## types

#### List

```javascript
let animals = #['bird', 'cat', 'dog'];
let animals = new List (['bird', 'cat', 'dog']);
let animals = new StringList (['bird', 'cat', 'dog']);
```

#### Tuple

```javascript
let tuple = #('Heiko', 33, true);
let tuple = new Tuple ('Heiko', 33, true);
```

#### Record

```javascript
let Person = new Struct ({ name: 'string', age: 'number', isAlive: 'bool' });

let person = #Person{ name: 'Tom', age: 30, isAlive: true };
let person = new Record (Person, { name: 'Tom', age: 30, isAlive: true });
```


```
union

Array
Bool
Number (Float, Int)
String

Deque
Map
Pair
Queue (FIFO)
Sequence
Set
Stack (LIFO)
Vector

List
List[Number]   NumberList
List[String]   StringList

Record

Tuple
literal:  let tuple = (123, 'Rat', true);
destruct: let ( a, b, c ) = tuple;

Color

Vec2 Vector2
Vec3 Vector3
```

```javascript
fn doSth = () => {... };
fn doSth = async () => {... };
```

```javascript
if (a) {...}
if (b) {...}
if (c) {...}
or     {...};
```

## match & switch

```javascript
let x := foo();
let text = match (x) {
  x  < 0  : 'x is negative',
  x == 0  : 'x is zero',
  default : 'x is positive',
}
console.log(text);
```

```javascript
let x := foo();
switch (x) {
  x  < 0  : console.log('x is negative'),
  x == 0  : console.log('x is zero'),
  default : console.log('x is positive'),
}
```

```javascript
let x := foo();
if  x < 0 {
	console.log("x is negative")
} else if x == 0 {
	console.log("x is zero")
} else {
	console.log("x is positive")
}
```

## Loops

### Bereichs-Schleife

```javascript
let arr = range(3);
loop (nr in arr) {
    ...
}
```

```javascript
let arr = range(3);
loop in arr as nr {
    ...
}
```

```javascript
loop in 0...3 as nr {
    ...
}
```

```javascript
for nr in range(0,10) {...};
for nr in range(0,10) do {...};
for nr in range(0,10) do sth();
```

```javascript
for (char, index) in a_string {
	console.log(index, char)
}
for (value, index) in a_list {
	console.log(index, value)
}
for (value, index) in a_tuple {
	console.log(index, value)f
}
for (key, value) in a_record {
	console.log(key, value)
}
```

```javascript
for (char, index) in a_string do console.log(index, char);
for (value, index) in a_list do console.log(index, value);
for (value, index) in a_tuple do console.log(index, value);
for (key, value) in a_record do console.log(key, value);
```

### bedingte Schleife (while-Ersatz)

```javascript
let x = 0;
loop (x < 5) {
  ...
}
```

```javascript
let x = 0;
loop while (x < 5) {
  ...
}
```

```javascript
loop while (x < 5) do sth();
```

### Endlosschleife

```javascript
loop {
  ...
}
```

## try ... catch

```javascript
try { let book = await fetchBooks(); }
catch throw new Error();
```

```javascript
try {
  ...
}
catch {
  ...
}
```





