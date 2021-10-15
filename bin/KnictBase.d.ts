interface IDataTargetMethod {
    knict?: any;
    (): any;
}
interface IFunctionAnnotation {
    (targetMethod: IDataTargetMethod, propertyKey: string): any;
}
interface IParamAnnotation {
    (targetMethod: IDataTargetMethod, propertyKey: string | symbol, parameterIndex: number): any;
}
interface IFunctionAnnotationRes {
    (target: any, propertyKey: string, descriptor: PropertyDescriptor): void;
}
declare function BaseAnotaionForFunction(f?: IFunctionAnnotation): IFunctionAnnotationRes;
interface IParamAnnotationRes {
    (target: any, propertyKey: string | symbol, parameterIndex: number): void;
}
declare function BaseAnotaionForParam(f?: IParamAnnotation): IParamAnnotationRes;
export { IParamAnnotation, IParamAnnotationRes, IFunctionAnnotation, IFunctionAnnotationRes, IDataTargetMethod, BaseAnotaionForFunction, BaseAnotaionForParam };
