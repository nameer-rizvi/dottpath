const simpul = require("simpul");

function dottpathSet(json, set) {
  if (simpul.isJSON(json) && simpul.isObject(set)) {
    const paths = Object.keys(set);

    function callback({ path, value }) {
      if (paths.includes(path)) return set[path];
      return value;
    }

    simpul.recursively(json, callback);
  }
}

module.exports = dottpathSet;
