const dottpath = require("../dist/cjs/index.js");

console.log("cjs -->", [
  dottpath.diffs({ a: 1 }, { a: 2 }),
  dottpath.diffs({ a: 1, b: 2 }, { a: 1 }),
  dottpath.diffs({ a: 1 }, { a: 1, b: 2 }),
  dottpath.diffs({ a: 1 }, { a: 1 }),
  dottpath.diffs({ a: 1 }, { a: 2 }, ["a"]),
]);
