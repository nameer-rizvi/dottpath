const simpul = require("simpul");
const dottpathMap = require("./map");
const dottpathExtract = require("./extract");

function dottpathDiffs(jsonA, jsonB, excludes) {
  const diffs = [];

  if (simpul.isJSON(jsonA) && simpul.isJSON(jsonB)) {
    if (JSON.stringify(jsonA) === JSON.stringify(jsonB)) return diffs;

    let paths = [...new Set([...dottpathMap(jsonA), ...dottpathMap(jsonB)])];

    paths.sort();

    if (excludes) {
      paths = paths.filter((path) => {
        return !excludes.some((exclude) => path.startsWith(exclude));
      });
    }

    const timestamp = new Date().getTime();

    for (let path of paths) {
      let valueA = dottpathExtract(jsonA, path);

      let valueB = dottpathExtract(jsonB, path);

      let isDiff =
        simpul.isDate(valueA) && simpul.isDate(valueB)
          ? new Date(valueA).getTime() !== new Date(valueB).getTime()
          : valueA !== valueB;

      if (isDiff) {
        let diff = { path, valueA, valueB, timestamp };

        let valueAIsValid = simpul.isValid(valueA);

        let valueBIsValid = simpul.isValid(valueB);

        diff.state = "value changed";

        if (valueA && !valueBIsValid) {
          diff.state = "property removed";
        } else if (valueB && !valueAIsValid) {
          diff.state = "property added";
        }

        if (simpul.isNumber(valueA) && simpul.isNumber(valueB)) {
          diff.change = simpul.math.change.num(valueA, valueB);
        }

        diffs.push(diff);
      }
    }
  }

  return diffs;
}

module.exports = dottpathDiffs;
