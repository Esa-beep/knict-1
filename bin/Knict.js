"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Knict = void 0;
const logger_1 = require("./logger");
const FUNCTION_TYPE_IPC_SEND = 'type_ipc_send';
const FUNCTION_TYPE_IPC_SEND_BRIDGE = 'type_ipc_send_bridge';
const FUNCTION_TYPE_ADDON = 'addon';
const FUNCTION_TYPE_IPC_ON = 'type_ipc_on';
logger_1.logger.info('knict');
/**
 * 尝试搞个简化能自动生成对应文档的electron ipc方式
 */
class Knict {
    constructor() {
        this.proxy = {};
        this.funcs = [];
    }
    static builder(builder) {
        const instance = new Knict();
        instance.Builder = builder;
        return instance;
    }
    static init(conf) {
        Knict.ipc = conf.ipcRenderer;
        Knict.addonInvokeMethod = conf.addonInvoke;
        Knict.isOutputKnict = conf.isOutputKnict ? conf.isOutputKnict : false;
    }
    create(basecls) {
        let others = {};
        let hasMemberFunctionInCls = false;
        let cls = new Object();
        Object.getOwnPropertyNames(Object.getPrototypeOf(basecls)).forEach((i) => {
            if (i !== 'constructor') {
                // Object.defineProperty(cls, i,  (basecls as any)[i] ) 
                cls[i] = basecls[i];
            }
        });
        logger_1.logger.log('Knict create', cls);
        for (let x in cls) {
            logger_1.logger.log('Knict create', 'typeof x', x, typeof cls[x]);
            if (typeof cls[x] === 'function') {
                this.funcs.push(cls[x]);
                hasMemberFunctionInCls = true;
            }
            else if (x === 'cppParserName' || x === 'cppConfig') {
                others[x] = cls[x];
            }
            else {
                logger_1.logger.error('Knict create else:', x, cls[x]);
            }
        }
        if (!hasMemberFunctionInCls) {
            // throw new Error('Member Function Not Found!')
        }
        logger_1.logger.log('Knict Knict.funcs', this.funcs);
        this.proxy = cls;
        this.buildFuncProxy();
        return Object.assign(Object.assign({}, this.proxy), others);
    }
    buildFuncProxy() {
        const currentBuilder = this.Builder;
        this.funcs.forEach((func) => {
            logger_1.logger.log('buildFuncProxy func', func, 'func.knict', func.knict);
            this.proxy[func.knict.name] = function () {
                let args = [];
                for (let pos = 0; pos < arguments.length; pos++) {
                    args.push(arguments[pos]);
                }
                func.knict.args = args;
                const k = func.knict;
                let builderRes = currentBuilder === null || currentBuilder === void 0 ? void 0 : currentBuilder.build(k);
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
                        logger_1.logger.log('Knict send ipc to', k.name, ' data: ', ...args);
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
                        logger_1.logger.log('Knict send ipc bridge to invoke', k.name, ' data: ', data);
                        return Knict.addonInvokeMethod && Knict.addonInvokeMethod('wedrive/' + k.name, data);
                    })();
                }
                // logger.log('Knict call', 'listRepos')
                return (() => {
                    logger_1.logger.log('Knict', func.knict);
                })();
            };
            if (Knict.isOutputKnict) {
                this.proxy[func.knict.name] = func.knict;
            }
        });
    }
}
exports.Knict = Knict;
Knict.isOutputKnict = false;
Knict.toggleLog = () => {
    logger_1.logger.togglerLog();
};
// function get(url: string) {
//     logger.log('Knictget(): evaluated')
//     return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//         let targetMethod = target[propertyKey]
//         if (targetMethod !== undefined && targetMethod instanceof Function) {
//             targetMethod.knict = {
//                 ...targetMethod.knict,
//                 get: url
//             }
//         }
//         logger.log('Knict get(): called', target, propertyKey, descriptor)
//     }
// }
// function path(path: string) {
//     logger.log('Knict path(): evaluated')
//     return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
//         let targetMethod = target[propertyKey]
//         if (targetMethod !== undefined && targetMethod instanceof Function) {
//             targetMethod.knict = {
//                 ...targetMethod.knict
//             }
//             if (targetMethod.knict.path == undefined) {
//                 targetMethod.knict.path = new Object()
//             }
//             targetMethod.knict.path[path] = parameterIndex
//         }
//         logger.log('Knict path(): called', target, propertyKey, parameterIndex)
//     }
// }
// interface IFunctionAnnotation{
//     (targetMethod:any):void
// }
// function anotaionForFunction(f: IFunctionAnnotation) {
//     return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
//         let targetMethod = target[propertyKey]
//         if (targetMethod !== undefined && targetMethod instanceof Function) {
//            f(targetMethod)
//         } else {
//             throw new Error('anotaionForFunction error')
//         }
//     }
// }
// function SendIpc() {
//     logger.log('Knict SendIpc(): evaluated')
//     return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//         let targetMethod = target[propertyKey]
//         if (targetMethod !== undefined && targetMethod instanceof Function) {
//             targetMethod.knict = {
//                 ...targetMethod.knict,
//                 name: propertyKey,
//                 platform: 'electron',
//                 type: FUNCTION_TYPE_IPC_SEND
//             }
//         }
//         logger.log('Knict SendIpc(): called', target, propertyKey, descriptor)
//     }
// }
// function cppParser(name: string) {
//     logger.log('Knict cppParser(): evaluated')
//     return function (target: any, propertyKey: string | symbol) {
//         // if (Knict.isOutputKnict) {
//         target.prototype.cppParserName = name
//         // }
//         logger.log('Knict cppParser()', target)
//     }
// }
// interface ICppConfig {
//     targetPath: string // 用于找到 需要自动生成的cpp代码的目录
//     tag: string // 用于 定位到 需要将自动生成的cpp代码存放到目标位置的代码
// }
// function cppConfig(config: ICppConfig) {
//     logger.log('Knict cppConfig(): evaluated')
//     return function (target: any, propertyKey: string | symbol) {
//         // if (Knict.isOutputKnict) {
//         target.prototype.cppConfig = config
//         // }
//         logger.log('Knict cppConfig()', target)
//     }
// }
// export { path, get }
// export { SendIpc, addon, str, number }
// export { cppParser, cppConfig, ICppConfig }
