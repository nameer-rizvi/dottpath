const simpul = require("simpul");

function dottpathSet(json, set) {
  if (simpul.isJSON(json) && simpul.isObject(set)) {
    simpul.recursively(json, ({ path, value }) => {
      return Object.keys(set).includes(path) ? set[path] : value;
    });
  }
}

module.exports = dottpathSet;
