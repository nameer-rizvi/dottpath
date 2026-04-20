const dottpath = require("../dist/cjs/index.js");

console.log("cjs -->", [
  dottpath.map({ a: 1, b: { c: 2 } }),
  dottpath.map({ a: [1, 2] }),
  dottpath.map([1, [2, 3]]),
  dottpath.map({ a: { b: { c: 1 } } }),
  dottpath.map({}),
  dottpath.map([]),
  dottpath.map(null),
]);
