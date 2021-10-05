// WIP

// const { isArray, isObject } = require("simpul");

// String, Number, Boolean, Date, Array, Object

// // Custom: () => {},
// // Date: ...
// // Array: includes, excludes, length.
// // Number: min, max, equals.
// // Object: .
// // String: whitelist, blacklist, match, matchSensitive, matchInsensitive.
// // Misc... value exists (value || isNumber(value) || isBoolean(value))

function query(array, config) {
  if (isArrayValid(array)) {
  } else return [];
}

function sort(array, config) {
  if (isArrayValid(array) && isObjectValid(config)) {
    // const { primary, secondary, reverse } = sort;
    //  if (primary)
    //    filteredRows.sort(
    //      (a, b) => a[primary] - b[primary] || a[secondary] - b[secondary]
    //    );
    //  if (reverse) filteredRows.reverse();
  }
}

const dottpathQueryObjects = (array) => ({
  query: (config) => query(array, config),
  sort: (config) => sort(array, config),
});

//   sort: {
//     secondary: "stocktwits_trending_score",
//     primary: "vol_approx_value",
//     reverse: true,
//   },
// //
// //     let condition;
// //     if (!filterKeys.length) {
// //       let primarySort = option.sort && option.sort.primary;
// //       condition = primarySort ? Boolean(row[primarySort]) : true;
// //     } else {
// //       for (let j = 0; j < filterKeys.length; j++) {
// //         let filterKey = filterKeys[j];
// //         let filterSetting = option.filter[filterKey];
// //         let filterSettingKeys = Object.keys(filterSetting);
// //         for (let k = 0; k < filterSettingKeys.length; k++) {
// //           if (condition !== false) {
// //             let filterSettingKey = filterSettingKeys[k];
// //             let rowValue = row[filterKey];
// //             let filterSettingValue = filterSetting[filterSettingKey];
// //             if (filterSettingKey === "exists") {
// //               condition =
// //                 typeof rowValue === "number" ||
// //                 typeof rowValue === "boolean" ||
// //                 Boolean(rowValue);
// //             } else if (filterSettingKey === "match") {
// //               condition =
// //                 typeof rowValue === "string" &&
// //                 rowValue.toLowerCase() === filterSettingValue.toLowerCase();
// //             } else if (filterSettingKey === "min") {
// //               condition =
// //                 typeof rowValue === "number" &&
// //                 rowValue >= filterSettingValue;
// //             } else if (filterSettingKey === "max") {
// //               condition =
// //                 typeof rowValue === "number" &&
// //                 rowValue <= filterSettingValue;
// //             }
// //           }
// //         }
// //       }
// //     }
// //     if (condition === true) filteredRows.push(row);
// //   }

module.exports = dottpathQueryObjects;
