"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const simpul_1 = __importDefault(require("simpul"));
const DELIMITER = ".";
function dottpathMap(input, prefix = "") {
    const paths = [];
    if (simpul_1.default.isArray(input)) {
        for (let i = 0; i < input.length; i++) {
            const item = input[i];
            const path = prefix ? [prefix, i].join(DELIMITER) : i.toString();
            const pushPath = isComposite(item) ? dottpathMap(item, path) : path;
            if (pushPath)
                paths.push(pushPath);
        }
    }
    else if (simpul_1.default.isObject(input)) {
        for (const [key, value] of Object.entries(input)) {
            const path = prefix ? [prefix, key].join(DELIMITER) : key;
            const pushPath = isComposite(value) ? dottpathMap(value, path) : path;
            if (pushPath)
                paths.push(pushPath);
        }
    }
    return paths.flat();
}
function isComposite(item) {
    return simpul_1.default.isArray(item) || simpul_1.default.isObject(item);
}
exports.default = dottpathMap;
