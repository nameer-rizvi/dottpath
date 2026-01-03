"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const simpul_1 = __importDefault(require("simpul"));
function dottpathSet(input, set) {
    if (simpul_1.default.isJSON(input) && simpul_1.default.isObjectNonEmpty(set)) {
        const keys = Object.keys(set);
        return simpul_1.default.recursively(input, ({ path, value }) => {
            return keys.includes(path) ? set[path] : value;
        });
    }
    else
        return input;
}
exports.default = dottpathSet;
