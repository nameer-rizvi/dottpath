"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const diffs_1 = __importDefault(require("./diffs"));
const extract_1 = __importDefault(require("./extract"));
const map_1 = __importDefault(require("./map"));
const set_1 = __importDefault(require("./set"));
const dottpath = {
    diffs: diffs_1.default,
    extract: extract_1.default,
    map: map_1.default,
    set: set_1.default,
};
module.exports = dottpath;
