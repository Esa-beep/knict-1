"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnictConsoleClientBuilder = exports.KnictBasicClientBuilder = void 0;
class KnictBasicClientBuilder {
    build(k) {
        return (() => {
            return k;
        })();
    }
}
exports.KnictBasicClientBuilder = KnictBasicClientBuilder;
class KnictConsoleClientBuilder {
    build(k) {
        return (() => {
            console.info('KnictConsoleClientBuilder', 'console', k);
            return k;
        })();
    }
}
exports.KnictConsoleClientBuilder = KnictConsoleClientBuilder;
