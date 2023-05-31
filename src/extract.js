const simpul = require("simpul");

function dottpathExtract(json, extract) {
  if (simpul.isString(extract)) {
    return extract.split(".").reduce((o, i) => o?.[i], json);
  } else if (simpul.isArray(extract)) {
    return extract.map((extract) => dottpathExtract(json, extract));
  } else if (simpul.isObject(extract)) {
    return Object.keys(extract).reduce((reducer, key) => {
      reducer[key] = dottpathExtract(json, extract[key]);
      return reducer;
    }, {});
  }
}

module.exports = dottpathExtract;
