"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseAnotaionForParam = exports.BaseAnotaionForFunction = void 0;
const logger_1 = require("./logger");
function BaseAnotaionForFunction(f) {
    return function (target, propertyKey, descriptor) {
        let targetMethod = target[propertyKey];
        if (targetMethod !== undefined && targetMethod instanceof Function) {
            if (targetMethod.knict === undefined) {
                targetMethod.knict = {};
            }
            const res = f && f(targetMethod, propertyKey);
            const knictData = targetMethod.knict;
            targetMethod.knict = injectInto(knictData, res);
        }
        else {
            throw new Error('anotaionForFunction error');
        }
    };
}
exports.BaseAnotaionForFunction = BaseAnotaionForFunction;
/**
 * copy all values from src to target
 * @param target
 * @param src
 */
function injectInto(target, src) {
    logger_1.logger.info('injectInto start ', target, src);
    if (src === undefined) {
        logger_1.logger.info('injectInto end', target);
        return target;
    }
    let res = {};
    for (let key in target) {
        let t = target[key];
        let s = src[key];
        if (s === undefined) {
            res[key] = t;
            continue;
        }
        if (t === undefined) {
            res[key] = s;
            continue;
        }
        if (typeof s !== typeof t) {
            throw new Error('Already has value for ' + key);
        }
        if (t instanceof Object) {
            res[key] = injectInto(t, s);
        }
        else {
            res[key] = s;
        }
        delete (src[key]);
    }
    for (let key in src) {
        res[key] = src[key];
    }
    logger_1.logger.info('injectInto end', res);
    return res;
}
function BaseAnotaionForParam(f) {
    return function (target, propertyKey, parameterIndex) {
        let targetMethod = target[propertyKey];
        if (targetMethod !== undefined && targetMethod instanceof Function) {
            if (targetMethod.knict === undefined) {
                targetMethod.knict = {};
            }
            const res = f && f(targetMethod, propertyKey, parameterIndex);
            const knictData = targetMethod.knict;
            targetMethod.knict = injectInto(knictData, res);
        }
        else {
            throw new Error('BaseAnotaionForParam error');
        }
    };
}
exports.BaseAnotaionForParam = BaseAnotaionForParam;
