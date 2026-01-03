import simpul from "simpul";
import dottpathMap from "./map";
import dottpathExtract from "./extract";

export interface Diff {
  path: string;
  valueA: unknown;
  valueB: unknown;
  state: "value changed" | "property added" | "property removed";
  change?: number;
  timestamp: number;
}

function dottpathDiffs(
  inputA: unknown,
  inputB: unknown,
  excludes: string[] = [],
): Diff[] {
  const diffs: Diff[] = [];

  if (
    !simpul.isJSON(inputA) ||
    !simpul.isJSON(inputB) ||
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

      if (!isValidValueA && isValidValueB) {
        diff.state = "property added";
      } else if (isValidValueA && !isValidValueB) {
        diff.state = "property removed";
      }

      if (simpul.isNumeric(valueA) && simpul.isNumeric(valueB)) {
        const numA = simpul.isNumberString(valueA)
          ? parseFloat(valueA)
          : valueA;

        const numB = simpul.isNumberString(valueB)
          ? parseFloat(valueB)
          : valueB;

        diff.change = simpul.math.change.num(numA, numB);
      } else if (simpul.isDate(valueA) && simpul.isDate(valueB)) {
        diff.change = new Date(valueB).getTime() - new Date(valueA).getTime();
      }

      diffs.push(diff);
    }
  }

  return diffs;
}

export default dottpathDiffs;
