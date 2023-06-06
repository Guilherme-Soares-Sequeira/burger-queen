"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDeferred = void 0;
const Errors_js_1 = require("../common/Errors.js");
/**
 * Creates and returns a deferred object along with the resolve/reject functions.
 *
 * If the deferred has not been resolved/rejected within the `timeout` period,
 * the deferred gets resolves with a timeout error. `timeout` has to be greater than 0 or
 * it is ignored.
 *
 * @internal
 */
function createDeferred(opts) {
    let isResolved = false;
    let isRejected = false;
    let _value;
    let resolver;
    const taskPromise = new Promise(resolve => {
        resolver = resolve;
    });
    const timeoutId = opts && opts.timeout > 0
        ? setTimeout(() => {
            reject(new Errors_js_1.TimeoutError(opts.message));
        }, opts.timeout)
        : undefined;
    function finish(value) {
        clearTimeout(timeoutId);
        _value = value;
        resolver();
    }
    function resolve(value) {
        if (isRejected || isResolved) {
            return;
        }
        isResolved = true;
        finish(value);
    }
    function reject(error) {
        if (isRejected || isResolved) {
            return;
        }
        isRejected = true;
        finish(error);
    }
    return {
        resolved: () => {
            return isResolved;
        },
        finished: () => {
            return isResolved || isRejected;
        },
        resolve,
        reject,
        value: () => {
            return _value;
        },
        async valueOrThrow() {
            await taskPromise;
            if (isRejected) {
                throw _value;
            }
            return _value;
        },
    };
}
exports.createDeferred = createDeferred;
//# sourceMappingURL=Deferred.js.map