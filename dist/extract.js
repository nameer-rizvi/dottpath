"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const simpul_1 = __importDefault(require("simpul"));
function dottpathExtract(json, extract) {
    if (simpul_1.default.isString(extract)) {
        return extract.split(".").reduce((o, i) => o === null || o === void 0 ? void 0 : o[i], json);
    }
    else if (simpul_1.default.isArray(extract)) {
        return extract.map((item) => dottpathExtract(json, item));
    }
    else if (simpul_1.default.isObject(extract)) {
        return Object.entries(extract).reduce((result, [key, value]) => {
            return Object.assign(Object.assign({}, result), { [key]: dottpathExtract(json, value) });
        }, {});
    }
}
exports.default = dottpathExtract;
