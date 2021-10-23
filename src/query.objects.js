const { isArrayValid, isDate, isObjectValid } = require("simpul");
const dottpathExtract = require("./extract");

// String,
// Number,
// Boolean,
// Date,
// Array,
// Object,
// Custom,

function query(array = [], config = {}) {
  if (isArrayValid(array)) {
    const passes = [];

    const queryKeys = Object.keys(config);

    for (let i = 0; i < array.length; i++) {
      let item = array[i];

      for (let j = 0; j < queryKeys.length; j++) {
        let key = queryKeys[j];

        let value = dottpathExtract(item, key);

        let filters = Object.keys(config[key]);

        let condition;

        for (let k = 0; k < filters.length; k++) {
          if (condition !== false) {
            let filter = filters[k];

            let setting = config[key][filter];

            if (setting) {
              let valueIsString = typeof value === "string";

              let valueIsNumber = typeof value === "number";

              condition =
                filter === "isType"
                  ? typeof value === setting
                  : filter === "isConstructor"
                  ? value && value.constructor === setting
                  : filter === "exists" && setting === true
                  ? valueIsString
                    ? Boolean(value.trim())
                    : valueIsNumber
                    ? valueIsNumber
                    : Boolean(value !== null && value !== undefined)
                  : filter === "exists" && setting === false
                  ? valueIsString
                    ? !Boolean(value.trim())
                    : valueIsNumber
                    ? !valueIsNumber
                    : !Boolean(value !== null && value !== undefined)
                  : filter === "matchInsensitive"
                  ? valueIsString
                    ? value.toLowerCase().trim() ===
                      setting.toLowerCase().trim()
                    : false
                  : filter === "matchSensitive" ||
                    filter === "match" ||
                    "equals"
                  ? valueIsString || valueIsNumber
                    ? value === setting
                    : false
                  : filter === "includesInsensitive"
                  ? valueIsString
                    ? value.toLowerCase().includes(setting.toLowerCase())
                    : false
                  : filter === "includesSensitive" || filter === "includes"
                  ? valueIsString
                    ? value.includes(setting)
                    : false
                  : filter === "minLength"
                  ? valueIsString
                    ? value.length >= setting
                    : false
                  : filter === "maxLength"
                  ? valueIsString
                    ? value.length <= setting
                    : false
                  : filter === "max"
                  ? valueIsNumber
                    ? value > setting
                    : false
                  : filter === "min"
                  ? valueIsNumber
                    ? value < setting
                    : false
                  : filter === "mod"
                  ? valueIsNumber
                    ? value % setting
                    : false
                  : false;
            }
          } else break;
        }

        if (condition === true) passes.push(item);
      }
    }

    return passes;
  } else return array;
}

const dottpathQueryObjects = (array) => ({
  query: (config) => query(array, config),
});

console.log(
  dottpathQueryObjects([
    { value: { state: 0 } },
    { value: { state: 1 } },
    { value: { state: 2 } },
    { value: { state: undefined } },
    { value: { state: 4 } },
  ]).query({ "value.state": { lessThan: 4 } })
);

// sort: (config) => sort(array, config),
//
// function sort(array, config) {
//   if (isArrayValid(array) && isObjectValid(config)) {
//     // const { primary, secondary, reverse } = sort;
//     //  if (primary)
//     //    filteredRows.sort(
//     //      (a, b) => a[primary] - b[primary] || a[secondary] - b[secondary]
//     //    );
//     //  if (reverse) filteredRows.reverse();
//   }
// }

module.exports = dottpathQueryObjects;
