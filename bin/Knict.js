"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cppConfig = exports.cppParser = exports.number = exports.str = exports.addon = exports.SendIpc = exports.get = exports.path = exports.Knict = void 0;
console.info('knict');
const FUNCTION_TYPE_IPC_SEND = 'type_ipc_send';
const FUNCTION_TYPE_IPC_SEND_BRIDGE = 'type_ipc_send_bridge';
const FUNCTION_TYPE_ADDON = 'addon';
const FUNCTION_TYPE_IPC_ON = 'type_ipc_on';
const isLogOpen = false;
const logger = (() => {
    if (isLogOpen) {
        return console;
    }
    else {
        return { log: () => { }, info: () => { }, error: () => { } };
    }
})();
/**
 * 尝试搞个简化能自动生成对应文档的electron ipc方式
 */
class Knict {
    static builder(builder) {
        this.Builder = builder;
        return this;
    }
    static init(conf) {
        Knict.ipc = conf.ipcRenderer;
        Knict.addonInvokeMethod = conf.addonInvoke;
        Knict.isOutputKnict = conf.isOutputKnict ? conf.isOutputKnict : false;
    }
    static create(basecls) {
        let others = {};
        let hasMemberFunctionInCls = false;
        let cls = new Object();
        Object.getOwnPropertyNames(Object.getPrototypeOf(basecls)).forEach((i) => {
            if (i !== 'constructor') {
                // Object.defineProperty(cls, i,  (basecls as any)[i] ) 
                cls[i] = basecls[i];
            }
        });
        logger.log('Knict create', cls);
        for (let x in cls) {
            console.info('a');
            logger.log('Knict create', 'typeof x', x, typeof cls[x]);
            if (typeof cls[x] === 'function') {
                this.funcs.push(cls[x]);
                hasMemberFunctionInCls = true;
            }
            else if (x === 'cppParserName' || x === 'cppConfig') {
                others[x] = cls[x];
            }
            else {
                logger.error('Knict create else:', x, cls[x]);
            }
        }
        if (!hasMemberFunctionInCls) {
            // throw new Error('Member Function Not Found!')
        }
        logger.log('Knict Knict.funcs', this.funcs);
        this.proxy = cls;
        Knict.buildFuncProxy();
        return Object.assign(Object.assign({}, this.proxy), others);
    }
    static buildFuncProxy() {
        this.funcs.forEach((func) => {
            logger.log('buildFuncProxy func', func, 'func.knict', func.knict);
            this.proxy[func.knict.name] = function () {
                var _a;
                let args = [];
                for (let pos = 0; pos < arguments.length; pos++) {
                    args.push(arguments[pos]);
                }
                func.knict.args = args;
                const k = func.knict;
                let builderRes = (_a = Knict.Builder) === null || _a === void 0 ? void 0 : _a.build(k);
                if (builderRes) {
                    return builderRes;
                }
                for (let path in func.knict.path) {
                    // logger.info('buildFuncProxy path', path)
                    func.knict.get = func.knict.get.replace('{' + path + '}', args[func.knict.path[path]]);
                }
                if (k.type && k.type === FUNCTION_TYPE_IPC_SEND) {
                    return (() => {
                        var _a;
                        logger.log('Knict send ipc to', k.name, ' data: ', ...args);
                        (_a = Knict.ipc) === null || _a === void 0 ? void 0 : _a.send(k.name, ...args);
                    })();
                }
                if (k.type && k.type === FUNCTION_TYPE_ADDON) {
                    let data = {};
                    let kDataStr = k.data ? k.data.str : [];
                    for (let x in kDataStr) {
                        data[x] = args[k.data.str[x]];
                    }
                    let kDataNumber = k.data ? k.data.number : [];
                    for (let x in kDataNumber) {
                        data[x] = args[k.data.number[x]];
                    }
                    return (() => {
                        logger.log('Knict send ipc bridge to invoke', k.name, ' data: ', data);
                        return Knict.addonInvokeMethod && Knict.addonInvokeMethod('wedrive/' + k.name, data);
                    })();
                }
                // logger.log('Knict call', 'listRepos')
                return (() => {
                    logger.log('Knict', func.knict);
                })();
            };
            if (Knict.isOutputKnict) {
                this.proxy[func.knict.name] = func.knict;
            }
        });
    }
}
exports.Knict = Knict;
Knict.proxy = {};
Knict.funcs = [];
Knict.isOutputKnict = false;
function get(url) {
    logger.log('Knictget(): evaluated');
    return function (target, propertyKey, descriptor) {
        let targetMethod = target[propertyKey];
        if (targetMethod !== undefined && targetMethod instanceof Function) {
            targetMethod.knict = Object.assign(Object.assign({}, targetMethod.knict), { get: url });
        }
        logger.log('Knict get(): called', target, propertyKey, descriptor);
    };
}
exports.get = get;
function path(path) {
    logger.log('Knict path(): evaluated');
    return function (target, propertyKey, parameterIndex) {
        let targetMethod = target[propertyKey];
        if (targetMethod !== undefined && targetMethod instanceof Function) {
            targetMethod.knict = Object.assign({}, targetMethod.knict);
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
        let targetMethod = target[propertyKey];
        if (targetMethod !== undefined && targetMethod instanceof Function) {
            targetMethod.knict = Object.assign(Object.assign({}, targetMethod.knict), { name: propertyKey, platform: 'electron', type: FUNCTION_TYPE_IPC_SEND });
        }
        logger.log('Knict SendIpc(): called', target, propertyKey, descriptor);
    };
}
exports.SendIpc = SendIpc;
function addon() {
    logger.log('Knict addon(): evaluated');
    return function (target, propertyKey, descriptor) {
        let targetMethod = target[propertyKey];
        if (targetMethod !== undefined && targetMethod instanceof Function) {
            targetMethod.knict = Object.assign(Object.assign({}, targetMethod.knict), { name: propertyKey, platform: 'electron', type: FUNCTION_TYPE_ADDON, res: targetMethod() });
        }
        logger.log('Knict addon(): called', target, propertyKey, descriptor);
    };
}
exports.addon = addon;
function str(key) {
    logger.log('Knict str(): evaluated');
    return function (target, propertyKey, parameterIndex) {
        let targetMethod = target[propertyKey];
        if (targetMethod !== undefined && targetMethod instanceof Function) {
            targetMethod.knict = Object.assign({}, targetMethod.knict);
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
        let targetMethod = target[propertyKey];
        if (targetMethod !== undefined && targetMethod instanceof Function) {
            targetMethod.knict = Object.assign({}, targetMethod.knict);
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
