declare interface IDataTargetMethod {
    knict?: any;
    (): any;
}
declare interface IFunctionAnnotation {
    (targetMethod: IDataTargetMethod, propertyKey: string): any;
}
declare interface IParamAnnotation {
    (targetMethod: IDataTargetMethod, propertyKey: string | symbol, parameterIndex: number): any;
}
declare interface IFunctionAnnotationRes {
    (target: any, propertyKey: string, descriptor: PropertyDescriptor): void;
}
declare function BaseAnotaionForFunction(f?: IFunctionAnnotation): IFunctionAnnotationRes;
declare interface IParamAnnotationRes {
    (target: any, propertyKey: string | symbol, parameterIndex: number): void;
}
declare function BaseAnotaionForParam(f?: IParamAnnotation): IParamAnnotationRes;
export { IParamAnnotation, IParamAnnotationRes, IFunctionAnnotation, IFunctionAnnotationRes, IDataTargetMethod, BaseAnotaionForFunction, BaseAnotaionForParam };
