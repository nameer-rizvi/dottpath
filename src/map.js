const { isArray, isObject } = require("simpul");

function dottpathMap(json, prepend = "") {
  const paths = [];

  const delimiter = ".";

  if (isArray(json)) {
    for (let i = 0; i < json.length; i++) {
      let index = i.toString();
      let path = prepend ? [prepend, index].join(delimiter) : index;
      let value = json[i];
      let pushPath =
        isArray(value) || isObject(value) ? dottpathMap(value, path) : path;
      paths.push(pushPath);
    }
  } else if (isObject(json)) {
    const keys = Object.keys(json);
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      let value = json[key];
      let path = [prepend, key].filter(Boolean).join(delimiter);
      let pushPath =
        isArray(value) || isObject(value) ? dottpathMap(value, path) : path;
      paths.push(pushPath);
    }
  }

  return paths.flat();
}

module.exports = dottpathMap;
