const simpul = require("simpul");

function dottpathMap(json, prepend = "") {
  const paths = [];

  const delimiter = ".";

  if (simpul.isArray(json)) {
    json.forEach((item, i) => {
      const path = prepend ? `${prepend}${delimiter}${i}` : `${i}`;
      const pushPath = isComposite(item) ? dottpathMap(item, path) : path;
      paths.push(pushPath);
    });
  } else if (simpul.isObject(json)) {
    Object.entries(json).forEach(([key, value]) => {
      const path = prepend ? `${prepend}${delimiter}${key}` : key;
      const pushPath = isComposite(value) ? dottpathMap(value, path) : path;
      paths.push(pushPath);
    });
  }

  return paths.flat();
}

function isComposite(item) {
  return simpul.isArray(item) || simpul.isObject(item);
}

module.exports = dottpathMap;
