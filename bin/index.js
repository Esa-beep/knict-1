"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var DemoIpcService_1 = require("./DemoIpcService");
var Knict = require("./Knict");
var KnictBuilder = require("./client/KnictClientBuidler");
exports.default = __assign(__assign(__assign({}, Knict), KnictBuilder), { DemoIpcService: DemoIpcService_1.default });
