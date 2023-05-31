const simpul = require("simpul");
const dottpathMap = require("./map");
const dottpathExtract = require("./extract");

function dottpathDiffs(prev, curr, excludePaths) {
  const diffs = [];

  if (simpul.isJSON(prev) && simpul.isJSON(curr)) {
    if (JSON.stringify(prev) === JSON.stringify(curr)) return diffs;

    let paths = [...dottpathMap(prev), ...dottpathMap(curr)];

    paths = [...new Set(paths)].sort();

    if (excludePaths)
      paths = paths.filter((p) => !excludePaths.some((p2) => p.startsWith(p2)));

    const timestamp = new Date().getTime();

    for (let path of paths) {
      let prevValue = dottpathExtract(prev, path);

      let currValue = dottpathExtract(curr, path);

      let isDiff =
        simpul.isDate(prevValue) && simpul.isDate(currValue)
          ? new Date(prevValue).getTime() !== new Date(currValue).getTime()
          : prevValue !== currValue;

      if (isDiff) {
        let diff = { path, currValue, prevValue, timestamp };

        let currValueRemoved = simpul.isValid(currValue);

        let prevValueRemoved = simpul.isValid(prevValue);

        if (prevValue && currValueRemoved) {
          diff.state = "property removed";
        } else if (prevValueRemoved && currValue) {
          diff.state = "property added";
        } else diff.state = "value changed";

        if (simpul.isNumber(prevValue) && simpul.isNumber(currValue))
          diff.change = Number(currValue) - Number(prevValue);

        diffs.push(diff);
      }
    }
  }

  return diffs;
}

module.exports = dottpathDiffs;
