const { isString, isArray, isObject } = require("simpul");

function dottpathExtract(json, extract) {
  if (isString(extract)) {
    return extract.split(".").reduce((o, i) => o && o[i], json);
  } else if (isArray(extract)) {
    const extracted = [];
    for (let i = 0; i < extract.length; i++) {
      extracted.push(dottpathExtract(json, extract[i]));
    }
    return extracted;
  } else if (isObject(extract)) {
    const extracted = {};
    const keys = Object.keys(extract);
    for (let i = 0; i < keys.length; i++) {
      extracted[keys[i]] = dottpathExtract(json, extract[keys[i]]);
    }
    return extracted;
  }
}

module.exports = dottpathExtract;
