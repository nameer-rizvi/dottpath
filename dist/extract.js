"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const simpul_1 = __importDefault(require("simpul"));
function dottpathExtract(input, extract) {
    if (simpul_1.default.isString(extract)) {
        let result = input;
        for (const path of extract.split("."))
            result = result === null || result === void 0 ? void 0 : result[path];
        return result;
    }
    else if (simpul_1.default.isArray(extract)) {
        const results = [];
        for (const path of extract)
            results.push(dottpathExtract(input, path));
        return results;
    }
    else if (simpul_1.default.isObject(extract)) {
        const result = {};
        for (const [key, value] of Object.entries(extract))
            result[key] = dottpathExtract(input, value);
        return result;
    }
}
exports.default = dottpathExtract;
