"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLogOpen = exports.logger = void 0;
let isLogOpen = false;
exports.isLogOpen = isLogOpen;
const logger = (() => {
    if (isLogOpen) {
        return console;
    }
    else {
        return { log: () => { }, info: () => { }, error: () => { } };
    }
})();
exports.logger = logger;
logger.togglerLog = () => {
    exports.isLogOpen = isLogOpen = !isLogOpen;
};
