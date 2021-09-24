console.info('knict')

const FUNCTION_TYPE_IPC_SEND = 'type_ipc_send'
const FUNCTION_TYPE_IPC_SEND_BRIDGE = 'type_ipc_send_bridge'
const FUNCTION_TYPE_ADDON = 'addon'
const FUNCTION_TYPE_IPC_ON = 'type_ipc_on'

interface KnictConf {
    ipcRenderer?: any
    addonInvoke?: Function
    isOutputKnict?: boolean
}

const isLogOpen = false

const logger: any = (() => {
    if (isLogOpen) {
        return console
    } else {
        return { log: () => { }, info: () => { }, error: () => { } }
    }
})()

/**
 * 尝试搞个简化能自动生成对应文档的electron ipc方式
 */
class Knict {
    static proxy: any = {}

    static funcs: any[] = []

    static ipc?: any

    private static addonInvokeMethod?: Function

    static isOutputKnict: boolean = false

    static init(conf: KnictConf) {
        Knict.ipc = conf.ipcRenderer
        Knict.addonInvokeMethod = conf.addonInvoke
        Knict.isOutputKnict = conf.isOutputKnict ? conf.isOutputKnict : false
    }

    static create<T>(cls: T): T {
        let others: any = {}
        for (let x in cls) {
            logger.log('Knict create', 'typeof x', x, typeof cls[x])
            if (typeof cls[x] === 'function') {
                this.funcs.push(cls[x])
            } else if (x === 'cppParserName' || x === 'cppConfig') {
                others[x] = cls[x]
            } else {
                logger.error('Knict create else:', x, cls[x])
            }
        }
        logger.log('Knict Knict.funcs', this.funcs)
        this.proxy = cls
        Knict.buildFuncProxy()
        return {
            ...this.proxy,
            ...others
        } as T
    }

    static buildFuncProxy() {
        this.funcs.forEach((func: any) => {
            logger.log('buildFuncProxy func', func, 'func.knict', func.knict)
            this.proxy[func.knict.name] = function () {
                let args: any[] = []
                for (let pos = 0; pos < arguments.length; pos++) {
                    args.push(arguments[pos])
                }
                const k = func.knict

                for (let path in func.knict.path) {
                    // logger.info('buildFuncProxy path', path)
                    func.knict.get = func.knict.get.replace('{' + path + '}', args[func.knict.path[path]])
                }
                if (k.type && k.type === FUNCTION_TYPE_IPC_SEND) {
                    return (() => {
                        logger.log('Knict send ipc to', k.name, ' data: ', ...args)
                        Knict.ipc?.send(k.name, ...args)
                    })()
                }

                if (k.type && k.type === FUNCTION_TYPE_ADDON) {
                    let data: any = {}
                    let kDataStr = k.data ? k.data.str : []
                    for (let x in kDataStr) {
                        data[x] = args[k.data.str[x]]
                    }
                    let kDataNumber = k.data ? k.data.number : []
                    for (let x in kDataNumber) {
                        data[x] = args[k.data.number[x]]
                    }
                    return (() => {
                        logger.log('Knict send ipc bridge to invoke', k.name, ' data: ', data)

                        return Knict.addonInvokeMethod && Knict.addonInvokeMethod('wedrive/' + k.name, data)
                    })()
                }

                // logger.log('Knict call', 'listRepos')
                return (() => {
                    logger.log('Knict', func.knict)
                })()
            }
            if (Knict.isOutputKnict) {
                this.proxy[func.knict.name] = func.knict
            }
        })
    }
}

function get(url: string) {
    logger.log('Knictget(): evaluated')
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let targetMethod = target[propertyKey]
        if (targetMethod !== undefined && targetMethod instanceof Function) {
            targetMethod.knict = {
                ...targetMethod.knict,
                get: url
            }
        }
        logger.log('Knict get(): called', target, propertyKey, descriptor)
    }
}

function path(path: string) {
    logger.log('Knict path(): evaluated')
    return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
        let targetMethod = target[propertyKey]
        if (targetMethod !== undefined && targetMethod instanceof Function) {
            targetMethod.knict = {
                ...targetMethod.knict
            }
            if (targetMethod.knict.path == undefined) {
                targetMethod.knict.path = new Object()
            }
            targetMethod.knict.path[path] = parameterIndex
        }
        logger.log('Knict path(): called', target, propertyKey, parameterIndex)
    }
}

function SendIpc() {
    logger.log('Knict SendIpc(): evaluated')
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let targetMethod = target[propertyKey]
        if (targetMethod !== undefined && targetMethod instanceof Function) {
            targetMethod.knict = {
                ...targetMethod.knict,
                name: propertyKey,
                platform: 'electron',
                type: FUNCTION_TYPE_IPC_SEND
            }
        }
        logger.log('Knict SendIpc(): called', target, propertyKey, descriptor)
    }
}

function addon() {
    logger.log('Knict addon(): evaluated')
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let targetMethod = target[propertyKey]
        if (targetMethod !== undefined && targetMethod instanceof Function) {
            targetMethod.knict = {
                ...targetMethod.knict,
                name: propertyKey,
                platform: 'electron',
                type: FUNCTION_TYPE_ADDON,
                res: targetMethod()
            }
        }
        logger.log('Knict addon(): called', target, propertyKey, descriptor)
    }
}

function str(key: string) {
    logger.log('Knict str(): evaluated')
    return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
        let targetMethod = target[propertyKey]
        if (targetMethod !== undefined && targetMethod instanceof Function) {
            targetMethod.knict = {
                ...targetMethod.knict
            }
            if (targetMethod.knict.data == undefined) {
                targetMethod.knict.data = new Object()
            }
            if (targetMethod.knict.data.str == undefined) {
                targetMethod.knict.data.str = new Object()
            }
            targetMethod.knict.data.str[key] = parameterIndex
        }
        logger.log('Knict str(): called', target, propertyKey, parameterIndex)
    }
}

function number(key: string) {
    logger.log('Knict number(): evaluated')
    return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
        let targetMethod = target[propertyKey]
        if (targetMethod !== undefined && targetMethod instanceof Function) {
            targetMethod.knict = {
                ...targetMethod.knict
            }
            if (targetMethod.knict.data == undefined) {
                targetMethod.knict.data = new Object()
            }
            if (targetMethod.knict.data.number == undefined) {
                targetMethod.knict.data.number = new Object()
            }
            targetMethod.knict.data.number[key] = parameterIndex
        }
        logger.log('Knict number(): called', target, propertyKey, parameterIndex)
    }
}

function cppParser(name: string) {
    logger.log('Knict cppParser(): evaluated')
    return function (target: any, propertyKey: string | symbol) {
        // if (Knict.isOutputKnict) {
        target.prototype.cppParserName = name
        // }
        logger.log('Knict cppParser()', target)
    }
}

interface ICppConfig {
    targetPath: string // 用于找到 需要自动生成的cpp代码的目录
    tag: string // 用于 定位到 需要将自动生成的cpp代码存放到目标位置的代码
}

function cppConfig(config: ICppConfig) {
    logger.log('Knict cppConfig(): evaluated')
    return function (target: any, propertyKey: string | symbol) {
        // if (Knict.isOutputKnict) {
        target.prototype.cppConfig = config
        // }
        logger.log('Knict cppConfig()', target)
    }
}

export { path, get }

export { SendIpc, addon, str, number }

export { cppParser, cppConfig, ICppConfig }

export default Knict
