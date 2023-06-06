/**
 * @internal
 */
export interface Deferred<T> {
    finished: () => boolean;
    resolved: () => boolean;
    resolve: (value: T) => void;
    reject: (error: Error) => void;
    value: () => T | Error | undefined;
    valueOrThrow: () => Promise<T>;
}
/**
 * @internal
 */
export interface DeferredOptions {
    message: string;
    timeout: number;
}
/**
 * Creates and returns a deferred object along with the resolve/reject functions.
 *
 * If the deferred has not been resolved/rejected within the `timeout` period,
 * the deferred gets resolves with a timeout error. `timeout` has to be greater than 0 or
 * it is ignored.
 *
 * @internal
 */
export declare function createDeferred<T>(opts?: DeferredOptions): Deferred<T>;
//# sourceMappingURL=Deferred.d.ts.map