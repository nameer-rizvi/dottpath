const dottpathMap = require("./map");
const dottpathExtract = require("./extract");
const { isDate, isNumber, tryCallback } = require("simpul");

function dottpathDiffs(prev, curr, excludePaths) {
  const diffs = [];

  if (JSON.stringify(prev) === JSON.stringify(curr)) return diffs;

  const allPaths = [...dottpathMap(prev), ...dottpathMap(curr)];

  let uniquePaths = [...new Set(allPaths)].sort();

  if (excludePaths)
    uniquePaths = uniquePaths.filter(
      (uniquePath) =>
        !excludePaths.some((excludePath) => uniquePath.startsWith(excludePath))
    );

  const timestamp = new Date().getTime();

  for (let i = 0; i < uniquePaths.length; i++) {
    let path = uniquePaths[i];

    let prevValue = dottpathExtract(prev, path);

    let currValue = dottpathExtract(curr, path);

    let isDiff =
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

      if (isNumber(prevValue) && isNumber(currValue))
        diff.change = Number(prevValue) - Number(currValue);

      diffs.push(diff);
    }
  }

  return diffs;
}

const dottpathDiffsWithCallback = (prev, curr, excludePaths, callback) =>
  tryCallback(() => dottpathDiffs(prev, curr, excludePaths), callback);

module.exports = dottpathDiffsWithCallback;
