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

### Endlosschleife

```javascript
loop {
  ...
}
```



