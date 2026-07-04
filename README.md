# rat

https://pulgasari.github.io/rat/

## types

union

Bool
Number (Float, Int)
String

List
NumberList
StringList

Record

Tuple
literal:  let tuple = (123, 'Rat', true);
destruct: let ( a, b, c ) = tuple;

Color

Vec2 Vector2
Vec3 Vector3

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
	console.log(index, value)
}
for (key, value) in a_record {
	console.log(key, value)
}
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





