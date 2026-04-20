const dottpath = require("../dist/cjs/index.js");

console.log("cjs -->", [
  dottpath.extract({ a: { b: 1 } }, "a.b"),
  dottpath.extract({ a: { b: 1 } }, "a.c"),
  dottpath.extract([null, { a: 1, b: 2 }], ["1.a", "1.b"]),
  dottpath.extract({ a: 1, b: 2 }, { x: "a", y: "b" }),
  dottpath.extract({ a: { b: 1 } }, { x: "a.b", y: "a.c" }),
  dottpath.extract(null, "a.b"),
]);
