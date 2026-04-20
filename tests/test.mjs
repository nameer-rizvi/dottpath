import dottpath from "../dist/esm/index.js";

console.log("mjs -->", [
  dottpath.diffs({ a: 1 }, { a: 2 }),
  dottpath.diffs({ a: 1, b: 2 }, { a: 1 }),
  dottpath.diffs({ a: 1 }, { a: 1, b: 2 }),
  dottpath.diffs({ a: 1 }, { a: 1 }),
  dottpath.diffs({ a: 1 }, { a: 2 }, ["a"]),
]);
