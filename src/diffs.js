const dottpathMap = require("./map");
const dottpathExtract = require("./extract");
const { isDate } = require("simpul");

function dottpathDiffs(prev, curr, excludePaths, callback) {
  const diffs = [];
  try {
    if (JSON.stringify(prev) === JSON.stringify(curr)) return diffs;

    let allPaths = [...dottpathMap(prev), ...dottpathMap(curr)];

    if (excludePaths)
      allPaths = allPaths.filter(
        (path) => !excludePaths.some((exclude) => path.startsWith(exclude))
      );

    const uniquePaths = [...new Set(allPaths)].sort();

    const timestamp = new Date().getTime();

    for (let i = 0; i < uniquePaths.length; i++) {
      let path = uniquePaths[i];

      let prevValue = dottpathExtract(prev, path);

      let currValue = dottpathExtract(curr, path);

      const isDiff =
        isDate(prevValue) && isDate(currValue)
          ? new Date(prevValue).getTime() !== new Date(currValue).getTime()
          : prevValue !== currValue;

      if (isDiff) {
        let diff = { path, currValue, prevValue, timestamp };

        let currValueRemoved = currValue === null || currValue === undefined;

        let prevValueRemoved = prevValue === null || prevValue === undefined;

        diff.state =
          prevValue && currValueRemoved
            ? "property removed"
            : prevValueRemoved && currValue
            ? "property added"
            : "value changed";

        if (typeof prevValue === "number" && typeof currValue === "number")
          diff.change = prevValue - currValue;

        diffs.push(diff);
      }
    }

    if (callback) callback(null, diffs);

    return diffs;
  } catch (err) {
    if (callback) callback(err);

    return diffs;
  }
}

module.exports = dottpathDiffs;
