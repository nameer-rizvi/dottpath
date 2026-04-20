# dottpath

Use dot path notation to find diffs, map paths, and set or extract values in JSON-serializable inputs.

## Installation

```bash
npm install dottpath
# or
yarn add dottpath
```

## Usage

```javascript
const dottpath = require("dottpath"); // commonjs
// or
import dottpath from "dottpath"; // esm
```

### Map

Generate a flat array of all dot paths in an input.

```javascript
dottpath.map({ a: 1, b: { c: 2 } }); // ["a", "b.c"]
dottpath.map({ a: [1, 2] }); // ["a.0", "a.1"]
dottpath.map([1, [2, 3]]); // ["0", "1.0", "1.1"]
dottpath.map({}); // []
```

### Extract

Extract values from an input using dot path notation.

```javascript
dottpath.extract({ a: { b: 1 } }, "a.b"); // 1
dottpath.extract({ a: 1, b: 2 }, ["a", "b"]); // [1, 2]
dottpath.extract({ a: 1, b: 2 }, { x: "a", y: "b" }); // { x: 1, y: 2 }
dottpath.extract({ a: { b: 1 } }, "a.c"); // undefined
```

### Set

Set values at specified dot paths in an input.

```javascript
dottpath.set({ a: 1, b: { c: 2 } }, { "b.c": 99 }); // { a: 1, b: { c: 99 } }
dottpath.set({ a: 1, b: { c: 2 } }, { a: 0 }); // { a: 0, b: { c: 2 } }
dottpath.set([1, [2, 3]], { "1.0": 99 }); // [1, [99, 3]]
dottpath.set({ a: 1 }, {}); // { a: 1 }
```

### Diffs

Find differences between two JSON-serializable inputs.

```javascript
dottpath.diffs({ a: 1 }, { a: 2 });
// [{ path: "a", valueA: 1, valueB: 2, state: "value changed", change: 1, timestamp: ... }]

dottpath.diffs({ a: 1, b: 2 }, { a: 1 });
// [{ path: "b", valueA: 2, valueB: undefined, state: "property removed", timestamp: ... }]

dottpath.diffs({ a: 1 }, { a: 1, b: 2 });
// [{ path: "b", valueA: undefined, valueB: 2, state: "property added", timestamp: ... }]

dottpath.diffs({ a: 1 }, { a: 2 }, ["a"]); // excludes path "a"
// []
```

#### Diff object

| Property    | Type                                                        | Description                                                  |
| ----------- | ----------------------------------------------------------- | ------------------------------------------------------------ |
| `path`      | `string`                                                    | Dot path of the changed value                                |
| `valueA`    | `unknown`                                                   | Value from the first input                                   |
| `valueB`    | `unknown`                                                   | Value from the second input                                  |
| `state`     | `"value changed" \| "property added" \| "property removed"` | Type of change                                               |
| `change`    | `number`                                                    | Numeric or timestamp delta (only for numeric or date values) |
| `timestamp` | `number`                                                    | Unix timestamp of when the diff was computed                 |

## License

MIT
