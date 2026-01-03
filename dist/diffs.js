"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const simpul_1 = __importDefault(require("simpul"));
const map_1 = __importDefault(require("./map"));
const extract_1 = __importDefault(require("./extract"));
function dottpathDiffs(inputA, inputB, excludes = []) {
    const diffs = [];
    if (!simpul_1.default.isJSON(inputA) ||
        !simpul_1.default.isJSON(inputB) ||
        Object.is(inputA, inputB) ||
        JSON.stringify(inputA) === JSON.stringify(inputB)) {
        return diffs;
    }
    let paths = [...new Set([...(0, map_1.default)(inputA), ...(0, map_1.default)(inputB)])];
    const excludeSet = [...new Set(excludes)];
    if (excludeSet.length > 0) {
        paths = paths.filter((path) => {
            return !excludeSet.some((exclude) => path.startsWith(exclude));
        });
    }
    paths.sort();
    const timestamp = Date.now();
    for (const path of paths) {
        const valueA = (0, extract_1.default)(inputA, path);
        const valueB = (0, extract_1.default)(inputB, path);
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
            if (!isValidValueA && isValidValueB) {
                diff.state = "property added";
            }
            else if (isValidValueA && !isValidValueB) {
                diff.state = "property removed";
            }
            if (simpul_1.default.isNumeric(valueA) && simpul_1.default.isNumeric(valueB)) {
                const numA = simpul_1.default.isNumberString(valueA)
                    ? parseFloat(valueA)
                    : valueA;
                const numB = simpul_1.default.isNumberString(valueB)
                    ? parseFloat(valueB)
                    : valueB;
                diff.change = simpul_1.default.math.change.num(numA, numB);
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
