const dottpath = require("../dist");

const jsonA = [1, [2], { 3: 4 }];

const jsonB = { 1: [1, [2], { 3: 4 }], 2: "thing" };

const mapA = dottpath.map(jsonA);

const mapB = dottpath.map(jsonB);

const extractA = dottpath.extract(jsonA, mapA);

const extractB = dottpath.extract(jsonB, mapB);

dottpath.set(
  jsonA,
  mapA.reduce((o, k) => ({ ...o, [k]: 0 }), {}),
);

dottpath.set(
  jsonB,
  mapB.reduce((o, k) => ({ ...o, [k]: null }), {}),
);

const diffsA = dottpath.diffs(
  [1, [2], { 3: 4 }, new Date("9/12/2024")],
  [...jsonA, new Date("9/13/2024")],
);

const diffsB = dottpath.diffs({ 1: [1, [2], { 3: 4 }], 2: "thing" }, jsonB);

console.log({ jsonA, jsonB, mapA, mapB, extractA, extractB, diffsA, diffsB });
