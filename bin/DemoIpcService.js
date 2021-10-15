"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const KnictBase = require("./KnictBase");
const logger_1 = require("./logger");
function addon() {
    logger_1.logger.log('Knict addon(): evaluated');
    return KnictBase.BaseAnotaionForFunction((targetMethod, propertyKey) => {
        targetMethod.knict = Object.assign(Object.assign({}, targetMethod.knict), { name: propertyKey, platform: 'electron', res: targetMethod() });
    });
}
function str(key) {
    logger_1.logger.log('Knict str(): evaluated');
    return KnictBase.BaseAnotaionForParam((targetMethod, propertyKey, parameterIndex) => {
        if (targetMethod.knict.data == undefined) {
            targetMethod.knict.data = new Object();
        }
        if (targetMethod.knict.data.str == undefined) {
            targetMethod.knict.data.str = new Object();
        }
        targetMethod.knict.data.str[key] = parameterIndex;
    });
}
function number(key) {
    logger_1.logger.log('Knict number(): evaluated');
    return KnictBase.BaseAnotaionForParam((targetMethod, propertyKey, parameterIndex) => {
        if (targetMethod.knict.data == undefined) {
            targetMethod.knict.data = new Object();
        }
        if (targetMethod.knict.data.number == undefined) {
            targetMethod.knict.data.number = new Object();
        }
        targetMethod.knict.data.number[key] = parameterIndex;
    });
}
class DemoIpcService {
    /**
     *
     * @param spaceId
     * @param folderId
     * @param fileId
     * @param scence
     */
    openAbc(spaceId, folderId, fileId, scence) { }
}
__decorate([
    addon(),
    __param(0, str('aa')),
    __param(1, str('bb')),
    __param(2, str('cc')),
    __param(3, number('dd')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Number]),
    __metadata("design:returntype", Object)
], DemoIpcService.prototype, "openAbc", null);
exports.default = DemoIpcService;
