"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const simpul_1 = __importDefault(require("simpul"));
function dottpathSet(json, set) {
    if (simpul_1.default.isJSON(json) && simpul_1.default.isObject(set)) {
        simpul_1.default.recursively(json, ({ path, value }) => {
            return Object.keys(set).includes(path) ? set[path] : value;
        });
    }
}
exports.default = dottpathSet;
