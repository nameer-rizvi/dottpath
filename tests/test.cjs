const dottpath = require("../dist/cjs/index.js");

console.log("cjs -->", [
  dottpath.set({ a: 1, b: { c: 2 } }, { "b.c": 99 }),
  dottpath.set({ a: 1, b: { c: 2 } }, { a: 0 }),
  dottpath.set([1, [2, 3]], { "1.0": 99 }),
  dottpath.set({ a: 1 }, {}),
  dottpath.set(null, { a: 1 }),
]);
