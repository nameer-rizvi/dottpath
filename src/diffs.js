const simpul = require("simpul");
const dottpathMap = require("./map");
const dottpathExtract = require("./extract");

function dottpathDiffs(jsonA, jsonB, excludes = []) {
  const diffs = [];

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
      const diff = { path, valueA, valueB };

      const isValidValueA = simpul.isValid(valueA);

      const isValidValueB = simpul.isValid(valueB);

      diff.state = "value changed";

      if (valueA && !isValidValueB) {
        diff.state = "property removed";
      } else if (valueB && !isValidValueA) {
        diff.state = "property added";
      }

      if (simpul.isNumber(valueA) && simpul.isNumber(valueB)) {
        diff.change = simpul.math.change.num(valueA, valueB);
      }

      diff.timestamp = timestamp;

      diffs.push(diff);
    }
  }

  return diffs;
}

module.exports = dottpathDiffs;
