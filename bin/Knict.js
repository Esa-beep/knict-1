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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cppConfig = exports.cppParser = exports.number = exports.str = exports.addon = exports.SendIpc = exports.get = exports.path = exports.Knict = void 0;
console.info('knict');
var FUNCTION_TYPE_IPC_SEND = 'type_ipc_send';
var FUNCTION_TYPE_IPC_SEND_BRIDGE = 'type_ipc_send_bridge';
var FUNCTION_TYPE_ADDON = 'addon';
var FUNCTION_TYPE_IPC_ON = 'type_ipc_on';
var isLogOpen = false;
var logger = (function () {
    if (isLogOpen) {
        return console;
    }
    else {
        return { log: function () { }, info: function () { }, error: function () { } };
    }
})();
/**
 * 尝试搞个简化能自动生成对应文档的electron ipc方式
 */
var Knict = /** @class */ (function () {
    function Knict() {
    }
    Knict.builder = function (builder) {
        this.Builder = builder;
        return this;
    };
    Knict.init = function (conf) {
        Knict.ipc = conf.ipcRenderer;
        Knict.addonInvokeMethod = conf.addonInvoke;
        Knict.isOutputKnict = conf.isOutputKnict ? conf.isOutputKnict : false;
    };
    Knict.create = function (cls) {
        var others = {};
        for (var x in cls) {
            logger.log('Knict create', 'typeof x', x, typeof cls[x]);
            if (typeof cls[x] === 'function') {
                this.funcs.push(cls[x]);
            }
            else if (x === 'cppParserName' || x === 'cppConfig') {
                others[x] = cls[x];
            }
            else {
                logger.error('Knict create else:', x, cls[x]);
            }
        }
        logger.log('Knict Knict.funcs', this.funcs);
        this.proxy = cls;
        Knict.buildFuncProxy();
        return __assign(__assign({}, this.proxy), others);
    };
    Knict.buildFuncProxy = function () {
        var _this = this;
        this.funcs.forEach(function (func) {
            logger.log('buildFuncProxy func', func, 'func.knict', func.knict);
            _this.proxy[func.knict.name] = function () {
                var _a;
                var args = [];
                for (var pos = 0; pos < arguments.length; pos++) {
                    args.push(arguments[pos]);
                }
                var k = func.knict;
                (_a = Knict.Builder) === null || _a === void 0 ? void 0 : _a.build(k);
                for (var path_1 in func.knict.path) {
                    // logger.info('buildFuncProxy path', path)
                    func.knict.get = func.knict.get.replace('{' + path_1 + '}', args[func.knict.path[path_1]]);
                }
                if (k.type && k.type === FUNCTION_TYPE_IPC_SEND) {
                    return (function () {
                        var _a;
                        logger.log.apply(logger, __spreadArray(['Knict send ipc to', k.name, ' data: '], args));
                        (_a = Knict.ipc) === null || _a === void 0 ? void 0 : _a.send.apply(_a, __spreadArray([k.name], args));
                    })();
                }
                if (k.type && k.type === FUNCTION_TYPE_ADDON) {
                    var data_1 = {};
                    var kDataStr = k.data ? k.data.str : [];
                    for (var x in kDataStr) {
                        data_1[x] = args[k.data.str[x]];
                    }
                    var kDataNumber = k.data ? k.data.number : [];
                    for (var x in kDataNumber) {
                        data_1[x] = args[k.data.number[x]];
                    }
                    return (function () {
                        logger.log('Knict send ipc bridge to invoke', k.name, ' data: ', data_1);
                        return Knict.addonInvokeMethod && Knict.addonInvokeMethod('wedrive/' + k.name, data_1);
                    })();
                }
                // logger.log('Knict call', 'listRepos')
                return (function () {
                    logger.log('Knict', func.knict);
                })();
            };
            if (Knict.isOutputKnict) {
                _this.proxy[func.knict.name] = func.knict;
            }
        });
    };
    Knict.proxy = {};
    Knict.funcs = [];
    Knict.isOutputKnict = false;
    return Knict;
}());
exports.Knict = Knict;
function get(url) {
    logger.log('Knictget(): evaluated');
    return function (target, propertyKey, descriptor) {
        var targetMethod = target[propertyKey];
        if (targetMethod !== undefined && targetMethod instanceof Function) {
            targetMethod.knict = __assign(__assign({}, targetMethod.knict), { get: url });
        }
        logger.log('Knict get(): called', target, propertyKey, descriptor);
    };
}
exports.get = get;
function path(path) {
    logger.log('Knict path(): evaluated');
    return function (target, propertyKey, parameterIndex) {
        var targetMethod = target[propertyKey];
        if (targetMethod !== undefined && targetMethod instanceof Function) {
            targetMethod.knict = __assign({}, targetMethod.knict);
            if (targetMethod.knict.path == undefined) {
                targetMethod.knict.path = new Object();
            }
            targetMethod.knict.path[path] = parameterIndex;
        }
        logger.log('Knict path(): called', target, propertyKey, parameterIndex);
    };
}
exports.path = path;
function SendIpc() {
    logger.log('Knict SendIpc(): evaluated');
    return function (target, propertyKey, descriptor) {
        var targetMethod = target[propertyKey];
        if (targetMethod !== undefined && targetMethod instanceof Function) {
            targetMethod.knict = __assign(__assign({}, targetMethod.knict), { name: propertyKey, platform: 'electron', type: FUNCTION_TYPE_IPC_SEND });
        }
        logger.log('Knict SendIpc(): called', target, propertyKey, descriptor);
    };
}
exports.SendIpc = SendIpc;
function addon() {
    logger.log('Knict addon(): evaluated');
    return function (target, propertyKey, descriptor) {
        var targetMethod = target[propertyKey];
        if (targetMethod !== undefined && targetMethod instanceof Function) {
            targetMethod.knict = __assign(__assign({}, targetMethod.knict), { name: propertyKey, platform: 'electron', type: FUNCTION_TYPE_ADDON, res: targetMethod() });
        }
        logger.log('Knict addon(): called', target, propertyKey, descriptor);
    };
}
exports.addon = addon;
function str(key) {
    logger.log('Knict str(): evaluated');
    return function (target, propertyKey, parameterIndex) {
        var targetMethod = target[propertyKey];
        if (targetMethod !== undefined && targetMethod instanceof Function) {
            targetMethod.knict = __assign({}, targetMethod.knict);
            if (targetMethod.knict.data == undefined) {
                targetMethod.knict.data = new Object();
            }
            if (targetMethod.knict.data.str == undefined) {
                targetMethod.knict.data.str = new Object();
            }
            targetMethod.knict.data.str[key] = parameterIndex;
        }
        logger.log('Knict str(): called', target, propertyKey, parameterIndex);
    };
}
exports.str = str;
function number(key) {
    logger.log('Knict number(): evaluated');
    return function (target, propertyKey, parameterIndex) {
        var targetMethod = target[propertyKey];
        if (targetMethod !== undefined && targetMethod instanceof Function) {
            targetMethod.knict = __assign({}, targetMethod.knict);
            if (targetMethod.knict.data == undefined) {
                targetMethod.knict.data = new Object();
            }
            if (targetMethod.knict.data.number == undefined) {
                targetMethod.knict.data.number = new Object();
            }
            targetMethod.knict.data.number[key] = parameterIndex;
        }
        logger.log('Knict number(): called', target, propertyKey, parameterIndex);
    };
}
exports.number = number;
function cppParser(name) {
    logger.log('Knict cppParser(): evaluated');
    return function (target, propertyKey) {
        // if (Knict.isOutputKnict) {
        target.prototype.cppParserName = name;
        // }
        logger.log('Knict cppParser()', target);
    };
}
exports.cppParser = cppParser;
function cppConfig(config) {
    logger.log('Knict cppConfig(): evaluated');
    return function (target, propertyKey) {
        // if (Knict.isOutputKnict) {
        target.prototype.cppConfig = config;
        // }
        logger.log('Knict cppConfig()', target);
    };
}
exports.cppConfig = cppConfig;
