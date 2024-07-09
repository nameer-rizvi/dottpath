const simpul = require("simpul");

function dottpathExtract(json, extract) {
  if (simpul.isString(extract)) {
    return extract.split(".").reduce((o, i) => o?.[i], json);
  } else if (simpul.isArray(extract)) {
    return extract.map((item) => dottpathExtract(json, item));
  } else if (simpul.isObject(extract)) {
    return Object.entries(extract).reduce((result, [key, value]) => {
      return { ...result, [key]: dottpathExtract(json, value) };
    }, {});
  }
}

module.exports = dottpathExtract;
