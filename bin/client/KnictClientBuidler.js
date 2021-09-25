"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnictConsoleClientBuilder = exports.KnictBasicClientBuilder = void 0;
var KnictBasicClientBuilder = /** @class */ (function () {
    function KnictBasicClientBuilder() {
    }
    KnictBasicClientBuilder.prototype.build = function (k) {
        return (function () {
        })();
    };
    return KnictBasicClientBuilder;
}());
exports.KnictBasicClientBuilder = KnictBasicClientBuilder;
var KnictConsoleClientBuilder = /** @class */ (function () {
    function KnictConsoleClientBuilder() {
    }
    KnictConsoleClientBuilder.prototype.build = function (k) {
        return (function () {
            console.info('KnictClientBuilder', 'build', k);
        })();
    };
    return KnictConsoleClientBuilder;
}());
exports.KnictConsoleClientBuilder = KnictConsoleClientBuilder;
