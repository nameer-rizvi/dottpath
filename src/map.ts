import * as utilN from "@nameer/utils";

const DELIMITER = ".";

/**
 * Generates a flat array of all dot paths in a JSON-serializable input.
 * Only paths to primitive values (leaves) are included.
 * @example
 * dottpathMap({ a: 1, b: { c: 2 } })          // ["a", "b.c"]
 * dottpathMap({ a: [1, 2] })                  // ["a.0", "a.1"]
 * dottpathMap([1, [2, 3]])                    // ["0", "1.0", "1.1"]
 * dottpathMap({ a: { b: { c: 1 } } })         // ["a.b.c"]
 * dottpathMap({})                             // []
 * dottpathMap([])                             // []
 * dottpathMap(null)                           // []
 */
function dottpathMap(input: unknown, prefix = ""): string[] {
  const paths: string[] = [];

  if (utilN.isArray(input)) {
    const arr = input as unknown[];
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      const path = prefix ? [prefix, i].join(DELIMITER) : i.toString();
      const pushPath = isComposite(item) ? dottpathMap(item, path) : path;
      if (pushPath) {
        paths.push(...(utilN.isArray(pushPath) ? pushPath : [pushPath]));
      }
    }
  } else if (utilN.isObject(input)) {
    for (const [key, value] of Object.entries(input)) {
      const path = prefix ? [prefix, key].join(DELIMITER) : key;
      const pushPath = isComposite(value) ? dottpathMap(value, path) : path;
      if (pushPath) {
        paths.push(...(utilN.isArray(pushPath) ? pushPath : [pushPath]));
      }
    }
  }

  return paths;
}

function isComposite(item: unknown): boolean {
  return utilN.isArray(item) || utilN.isObject(item);
}

export default dottpathMap;
