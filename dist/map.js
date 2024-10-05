"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const simpul_1 = __importDefault(require("simpul"));
function dottpathMap(json, prepend = "") {
    const paths = [];
    const delimiter = ".";
    if (simpul_1.default.isArray(json)) {
        json.forEach((item, i) => {
            const path = prepend ? [prepend, i].join(delimiter) : i.toString();
            const pushPath = isComposite(item) ? dottpathMap(item, path) : path;
            if (pushPath)
                paths.push(pushPath);
        });
    }
    else if (simpul_1.default.isObject(json)) {
        Object.entries(json).forEach(([key, value]) => {
            const path = prepend ? [prepend, key].join(delimiter) : key;
            const pushPath = isComposite(value) ? dottpathMap(value, path) : path;
            if (pushPath)
                paths.push(pushPath);
        });
    }
    return paths.flat();
}
function isComposite(item) {
    return simpul_1.default.isArray(item) || simpul_1.default.isObject(item);
}
exports.default = dottpathMap;
