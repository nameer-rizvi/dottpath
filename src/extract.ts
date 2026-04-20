import * as utils from "@nameer/utils";

/**
 * Extracts values from an input using dot path notation.
 * Accepts a single path string, an array of paths, or an object mapping keys to paths.
 * Returns `undefined` if a path cannot be resolved.
 * @example
 * dottpathExtract({ a: { b: 1 } }, "a.b")                        // 1
 * dottpathExtract({ a: { b: 1 } }, "a.c")                        // undefined
 * dottpathExtract([null, { a: 1, b: 2 }], ["1.a", "1.b"])        // [1, 2]
 * dottpathExtract({ a: 1, b: 2 }, { x: "a", y: "b" })            // { x: 1, y: 2 }
 * dottpathExtract({ a: { b: 1 } }, { x: "a.b", y: "a.c" })       // { x: 1, y: undefined }
 * dottpathExtract(null, "a.b")                                   // undefined
 */
function dottpathExtract(input: unknown, extract: unknown): unknown {
  if (utils.isString(extract)) {
    let result: unknown = input;
    for (const path of extract.split("."))
      result = (result as Record<string, unknown>)?.[path];
    return result;
  }

  if (utils.isArray(extract)) {
    const results: unknown[] = [];
    for (const path of extract) results.push(dottpathExtract(input, path));
    return results;
  }

  if (utils.isObject(extract)) {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(extract))
      result[key] = dottpathExtract(input, value);
    return result;
  }
}

export default dottpathExtract;
