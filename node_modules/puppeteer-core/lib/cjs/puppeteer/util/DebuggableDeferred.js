"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDebuggableDeferred = void 0;
const environment_js_1 = require("../environment.js");
const Deferred_js_1 = require("./Deferred.js");
/**
 * Creates and returns a deferred promise using DEFERRED_PROMISE_DEBUG_TIMEOUT
 * if it's specified or a normal deferred promise otherwise.
 *
 * @internal
 */
function createDebuggableDeferred(message) {
    if (environment_js_1.DEFERRED_PROMISE_DEBUG_TIMEOUT > 0) {
        return (0, Deferred_js_1.createDeferred)({
            message,
            timeout: environment_js_1.DEFERRED_PROMISE_DEBUG_TIMEOUT,
        });
    }
    return (0, Deferred_js_1.createDeferred)();
}
exports.createDebuggableDeferred = createDebuggableDeferred;
//# sourceMappingURL=DebuggableDeferred.js.map