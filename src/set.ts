import * as utils from "@nameer/utils";

/**
 * Sets values at specified dot paths in a JSON-serializable input.
 * Returns the input unchanged if it is not JSON-serializable or if `set` is empty.
 * @example
 * dottpathSet({ a: 1, b: { c: 2 } }, { "b.c": 99 })     // { a: 1, b: { c: 99 } }
 * dottpathSet({ a: 1, b: { c: 2 } }, { "a": 0 })        // { a: 0, b: { c: 2 } }
 * dottpathSet([1, [2, 3]], { "1.0": 99 })               // [1, [99, 3]]
 * dottpathSet({ a: 1 }, {})                             // { a: 1 }
 * dottpathSet(null, { "a": 1 })                         // null
 */
function dottpathSet(input: unknown, set: Record<string, unknown>): unknown {
  if (utils.isObject(set)) {
    const keys = Object.keys(set);
    return utils.recursively(input, ({ path, value }) => {
      return keys.includes(path) ? set[path] : value;
    });
  }
  return input;
}

export default dottpathSet;
