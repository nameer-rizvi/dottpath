const { isString, isArray, isObject } = require("simpul");

const dottpathExtract = (json, extract) =>
  isString(extract)
    ? extract.split(".").reduce((o, i) => o?.[i], json)
    : isArray(extract)
    ? extracted.map((extract) => dottpathExtract(json, extract))
    : isObject(extract)
    ? Object.keys(extract).reduce(
        (reducer, key) => ({
          ...reducer,
          [key]: dottpathExtract(json, extract[key]),
        }),
        {}
      )
    : undefined;

module.exports = dottpathExtract;
