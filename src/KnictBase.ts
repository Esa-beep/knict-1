
interface IDataTargetMethod {
    knict?: any
    (): any
}

interface IFunctionAnnotation {
    (targetMethod: IDataTargetMethod, propertyKey: string): any
}


interface IParamAnnotation {
    (targetMethod: IDataTargetMethod, propertyKey: string | symbol, parameterIndex: number): any
}


interface IFunctionAnnotationRes {
    (target: any, propertyKey: string, descriptor: PropertyDescriptor): void
}

function BaseAnotaionForFunction(f?: IFunctionAnnotation): IFunctionAnnotationRes {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let targetMethod = target[propertyKey]
        if (targetMethod !== undefined && targetMethod instanceof Function) {
            f && f(targetMethod, propertyKey)
        } else {
            throw new Error('anotaionForFunction error')
        }
    }
}

interface IParamAnnotationRes {
    (target: any, propertyKey: string | symbol, parameterIndex: number): void
}

function BaseAnotaionForParam(f?: IParamAnnotation): IParamAnnotationRes {
    return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
        let targetMethod = target[propertyKey]
        if (targetMethod !== undefined && targetMethod instanceof Function) {

            targetMethod.knict = {
                ...targetMethod.knict
            }
            f && f(targetMethod, propertyKey, parameterIndex)
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