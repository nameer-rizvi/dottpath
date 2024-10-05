import simpul from "simpul";
import dottpathMap from "./map";
import dottpathExtract from "./extract";

interface Diff {
  path: string;
  valueA: any;
  valueB: any;
  state: string;
  change?: number;
  timestamp: number;
}

function dottpathDiffs(
  jsonA: any,
  jsonB: any,
  excludes: string[] = [],
): Diff[] {
  const diffs: Diff[] = [];

  if (!simpul.isJSON(jsonA) || !simpul.isJSON(jsonB)) return diffs;

  if (JSON.stringify(jsonA) === JSON.stringify(jsonB)) return diffs;

  let paths = [...new Set([...dottpathMap(jsonA), ...dottpathMap(jsonB)])];

  paths.sort();

  if (excludes.length > 0) {
    paths = paths.filter((path) => {
      return !excludes.some((exclude) => path.startsWith(exclude));
    });
  }

  const timestamp = Date.now();

  for (const path of paths) {
    const valueA = dottpathExtract(jsonA, path);

    const valueB = dottpathExtract(jsonB, path);

    const isDiff =
      simpul.isDate(valueA) && simpul.isDate(valueB)
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

      const isValidValueA = simpul.isValid(valueA);

      const isValidValueB = simpul.isValid(valueB);

      if (valueA && !isValidValueB) {
        diff.state = "property removed";
      } else if (valueB && !isValidValueA) {
        diff.state = "property added";
      }

      if (simpul.isNumber(valueA) && simpul.isNumber(valueB)) {
        diff.change = simpul.math.change.num(valueA, valueB);
      } else if (simpul.isDate(valueA) && simpul.isDate(valueB)) {
        diff.change = new Date(valueB).getTime() - new Date(valueA).getTime();
      }

      diffs.push(diff);
    }
  }

  return diffs;
}

export default dottpathDiffs;
