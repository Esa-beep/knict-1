"use strict";
const DemoIpcService_1 = require("./DemoIpcService");
const KnictM = require("./Knict");
const KnictBuilder = require("./client/KnictClientBuidler");
module.exports = Object.assign(Object.assign(Object.assign({}, KnictM), KnictBuilder), { DemoIpcService: DemoIpcService_1.default });
