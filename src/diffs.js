const { tryCallback, isDate, isNumber } = require("simpul");
const dottpathMap = require("./map");
const dottpathExtract = require("./extract");

const dottpathDiffs = (prev, curr, excludePaths, callback) =>
  tryCallback(() => {
    {
      const diffs = [];

      if (JSON.stringify(prev) === JSON.stringify(curr)) return diffs;

      const allPaths = [...dottpathMap(prev), ...dottpathMap(curr)];

      let uniquePaths = [...new Set(allPaths)].sort();

      if (excludePaths)
        uniquePaths = uniquePaths.filter((uniquePath) => {
          return !excludePaths.some((excludePath) => {
            return uniquePath.startsWith(excludePath);
          });
        });

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
            diff.change = Number(currValue) - Number(prevValue);

          diffs.push(diff);
        }
      }

      return diffs;
    }
  }, callback);

module.exports = dottpathDiffs;
