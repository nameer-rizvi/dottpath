import dottpath from "../dist/esm/index.js";

console.log("mjs -->", [
  dottpath.map({ a: 1, b: { c: 2 } }),
  dottpath.map({ a: [1, 2] }),
  dottpath.map([1, [2, 3]]),
  dottpath.map({ a: { b: { c: 1 } } }),
  dottpath.map({}),
  dottpath.map([]),
  dottpath.map(null),
]);
