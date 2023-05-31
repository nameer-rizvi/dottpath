const simpul = require("simpul");

function dottpathMap(json, prepend = "") {
  const paths = [];

  const delimiter = ".";

  if (simpul.isArray(json)) {
    for (let i = 0; i < json.length; i++) {
      let index = i.toString();
      let path = prepend ? [prepend, index].join(delimiter) : index;
      let item = json[i];
      let pushPath =
        simpul.isArray(item) || simpul.isObject(item)
          ? dottpathMap(item, path)
          : path;
      paths.push(pushPath);
    }
  } else if (simpul.isObject(json)) {
    for (let key of Object.keys(json)) {
      let value = json[key];
      let path = prepend ? [prepend, key].join(delimiter) : key;
      let pushPath =
        simpul.isArray(value) || simpul.isObject(value)
          ? dottpathMap(value, path)
          : path;
      paths.push(pushPath);
    }
  }

  return paths.flat();
}

module.exports = dottpathMap;
