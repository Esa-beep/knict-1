"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnictConsoleClientBuilder = exports.KnictBasicClientBuilder = void 0;
class KnictBasicClientBuilder {
    build(k) {
        return (() => {
        })();
    }
}
exports.KnictBasicClientBuilder = KnictBasicClientBuilder;
class KnictConsoleClientBuilder {
    build(k) {
        return (() => {
            console.info('KnictClientBuilder', 'build', k);
        })();
    }
}
exports.KnictConsoleClientBuilder = KnictConsoleClientBuilder;
