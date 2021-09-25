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
var Knict_1 = require("./Knict");
var DemoIpcService = /** @class */ (function () {
    function DemoIpcService() {
    }
    /**
     *
     * @param spaceId
     * @param folderId
     * @param fileId
     * @param scence
     */
    DemoIpcService.prototype.openAbc = function (spaceId, folderId, fileId, scence) { };
    __decorate([
        Knict_1.addon(),
        __param(0, Knict_1.str('aa')),
        __param(1, Knict_1.str('bb')),
        __param(2, Knict_1.str('cc')),
        __param(3, Knict_1.number('dd')),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String, String, Number]),
        __metadata("design:returntype", Object)
    ], DemoIpcService.prototype, "openAbc", null);
    return DemoIpcService;
}());
exports.default = DemoIpcService;
