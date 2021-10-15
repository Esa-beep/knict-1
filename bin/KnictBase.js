"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseAnotaionForParam = exports.BaseAnotaionForFunction = void 0;
function BaseAnotaionForFunction(f) {
    return function (target, propertyKey, descriptor) {
        let targetMethod = target[propertyKey];
        if (targetMethod !== undefined && targetMethod instanceof Function) {
            f && f(targetMethod, propertyKey);
        }
        else {
            throw new Error('anotaionForFunction error');
        }
    };
}
exports.BaseAnotaionForFunction = BaseAnotaionForFunction;
function BaseAnotaionForParam(f) {
    return function (target, propertyKey, parameterIndex) {
        let targetMethod = target[propertyKey];
        if (targetMethod !== undefined && targetMethod instanceof Function) {
            targetMethod.knict = Object.assign({}, targetMethod.knict);
            f && f(targetMethod, propertyKey, parameterIndex);
        }
    };
}
exports.BaseAnotaionForParam = BaseAnotaionForParam;
