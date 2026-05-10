import * as utilN from "@nameer/utils";
import dottpathMap from "./map.js";
import dottpathExtract from "./extract.js";

export interface Diff {
  path: string;
  valueA: unknown;
  valueB: unknown;
  state: "value changed" | "property added" | "property removed";
  change?: number;
  timestamp: number;
}

/**
 * Returns a list of differences between two JSON-serializable inputs.
 * Each diff includes the path, both values, a state, an optional numeric change, and a timestamp.
 * Returns an empty array if the inputs are equal or either is not JSON-serializable.
 * @example
 * dottpathDiffs({ a: 1 }, { a: 2 })
 * // [{ path: "a", valueA: 1, valueB: 2, state: "value changed", change: 1, timestamp: ... }]
 *
 * dottpathDiffs({ a: 1, b: 2 }, { a: 1 })
 * // [{ path: "b", valueA: 2, valueB: undefined, state: "property removed", timestamp: ... }]
 *
 * dottpathDiffs({ a: 1 }, { a: 1, b: 2 })
 * // [{ path: "b", valueA: undefined, valueB: 2, state: "property added", timestamp: ... }]
 *
 * dottpathDiffs({ a: 1 }, { a: 1 })
 * // []
 *
 * dottpathDiffs({ a: 1 }, { a: 2 }, ["a"])
 * // []
 */
function dottpathDiffs(
  inputA: unknown,
  inputB: unknown,
  excludes: string[] = [],
): Diff[] {
  const diffs: Diff[] = [];

  if (
    !utilN.isJson(inputA) ||
    !utilN.isJson(inputB) ||
    Object.is(inputA, inputB) ||
    JSON.stringify(inputA) === JSON.stringify(inputB)
  ) {
    return diffs;
  }

  let paths = [...new Set([...dottpathMap(inputA), ...dottpathMap(inputB)])];

  const excludeSet = [...new Set(excludes)];

  if (excludeSet.length > 0) {
    paths = paths.filter((path) => {
      return !excludeSet.some((exclude) => path.startsWith(exclude));
    });
  }

  paths.sort();

  const timestamp = Date.now();

  for (const path of paths) {
    const valueA = dottpathExtract(inputA, path);
    const valueB = dottpathExtract(inputB, path);

    const isDiff =
      utilN.isDate(valueA) && utilN.isDate(valueB)
        ? new Date(valueA).getTime() !== new Date(valueB).getTime()
        : valueA !== valueB;

    if (isDiff) {
      const diff: Diff = {
        path,
        valueA,
        valueB,
        state: "value changed",
        timestamp,
      };

      const isValidValueA = utilN.isValid(valueA);
      const isValidValueB = utilN.isValid(valueB);

      if (!isValidValueA && isValidValueB) {
        diff.state = "property added";
      } else if (isValidValueA && !isValidValueB) {
        diff.state = "property removed";
      }

      if (utilN.isNumeric(valueA) && utilN.isNumeric(valueB)) {
        const numA = utilN.isNumberString(valueA) ? parseFloat(valueA) : valueA;
        const numB = utilN.isNumberString(valueB) ? parseFloat(valueB) : valueB;
        diff.change = utilN.math.change.num(numA, numB);
      } else if (utilN.isDate(valueA) && utilN.isDate(valueB)) {
        diff.change =
          new Date(valueB as string).getTime() -
          new Date(valueA as string).getTime();
      }

      diffs.push(diff);
    }
  }

  return diffs;
}

export default dottpathDiffs;
