
import { logger } from './logger'

declare interface IDataTargetMethod {
    knict?: any
    (): any
}

declare interface IFunctionAnnotation {
    
    /**
     * 
     * @param {IDataTargetMethod} targetMethod you can change value by this
     * @returns of return value 
     */
    (targetMethod: IDataTargetMethod, propertyKey: string): any
}


declare interface IParamAnnotation {
    /**
     * 
     * @param {IDataTargetMethod} targetMethod you can change value by this
     * @returns of return value 
     */
    (targetMethod: IDataTargetMethod, propertyKey: string | symbol, parameterIndex: number): any
}


declare interface IFunctionAnnotationRes {
    (target: any, propertyKey: string, descriptor: PropertyDescriptor): void
}

function BaseAnotaionForFunction(f?: IFunctionAnnotation): IFunctionAnnotationRes {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let targetMethod = target[propertyKey]
        if (targetMethod !== undefined && targetMethod instanceof Function) {
            if (targetMethod.knict === undefined) {
                targetMethod.knict = {}
            }
            const res = f && f(targetMethod, propertyKey)
            const knictData = targetMethod.knict
            targetMethod.knict = injectInto(knictData, res)
        } else {
            throw new Error('anotaionForFunction error')
        }
    }
}

declare interface IParamAnnotationRes {
    (target: any, propertyKey: string | symbol, parameterIndex: number): void
}

/**
 * copy all values from src to target 
 * @param target 
 * @param src 
 */
function injectInto(target: any, src: any) {
    logger.info('injectInto start ', target, src)
    if (src === undefined) {
        logger.info('injectInto end', target)
        return target
    }
    let res: any = {}
    for (let key in target) {
        let t = target[key]
        let s = src[key]
        if (s === undefined) {
            res[key] = t
            continue
        }
        
        if (t === undefined) {
            res[key] = s
            continue
        }
        
        if (typeof s !== typeof t) {
            throw new Error('Already has value for ' + key)
        }
        
        if (t instanceof Object) {
            res[key] = injectInto(t, s)
        } else {
            res[key] = s
        }
        delete (src[key])
    }
    for (let key in src) {
        res[key] = src[key]
    }
    logger.info('injectInto end', res)
    return res
}

function BaseAnotaionForParam(f?: IParamAnnotation): IParamAnnotationRes {
    return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
        let targetMethod = target[propertyKey]
        if (targetMethod !== undefined && targetMethod instanceof Function) {
            if (targetMethod.knict === undefined) {
                targetMethod.knict = {}
            }
            const res = f && f(targetMethod, propertyKey, parameterIndex)
            const knictData = targetMethod.knict
            targetMethod.knict = injectInto(knictData, res)
        } else {
            throw new Error('BaseAnotaionForParam error')
        }
    }
}

export {
    IParamAnnotation,
    IParamAnnotationRes,
    IFunctionAnnotation,
    IFunctionAnnotationRes,
    IDataTargetMethod,
    BaseAnotaionForFunction,
    BaseAnotaionForParam
}