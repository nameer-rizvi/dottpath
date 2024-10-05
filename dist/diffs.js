"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const simpul_1 = __importDefault(require("simpul"));
const map_1 = __importDefault(require("./map"));
const extract_1 = __importDefault(require("./extract"));
function dottpathDiffs(jsonA, jsonB, excludes = []) {
    const diffs = [];
    if (!simpul_1.default.isJSON(jsonA) || !simpul_1.default.isJSON(jsonB))
        return diffs;
    if (JSON.stringify(jsonA) === JSON.stringify(jsonB))
        return diffs;
    let paths = [...new Set([...(0, map_1.default)(jsonA), ...(0, map_1.default)(jsonB)])];
    paths.sort();
    if (excludes.length > 0) {
        paths = paths.filter((path) => {
            return !excludes.some((exclude) => path.startsWith(exclude));
        });
    }
    const timestamp = Date.now();
    for (const path of paths) {
        const valueA = (0, extract_1.default)(jsonA, path);
        const valueB = (0, extract_1.default)(jsonB, path);
        const isDiff = simpul_1.default.isDate(valueA) && simpul_1.default.isDate(valueB)
            ? new Date(valueA).getTime() !== new Date(valueB).getTime()
            : valueA !== valueB;
        if (isDiff) {
            const diff = {
                path,
                valueA,
                valueB,
                state: "value changed",
                timestamp,
            };
            const isValidValueA = simpul_1.default.isValid(valueA);
            const isValidValueB = simpul_1.default.isValid(valueB);
            if (valueA && !isValidValueB) {
                diff.state = "property removed";
            }
            else if (valueB && !isValidValueA) {
                diff.state = "property added";
            }
            if (simpul_1.default.isNumber(valueA) && simpul_1.default.isNumber(valueB)) {
                diff.change = simpul_1.default.math.change.num(valueA, valueB);
            }
            else if (simpul_1.default.isDate(valueA) && simpul_1.default.isDate(valueB)) {
                diff.change = new Date(valueB).getTime() - new Date(valueA).getTime();
            }
            diffs.push(diff);
        }
    }
    return diffs;
}
exports.default = dottpathDiffs;
