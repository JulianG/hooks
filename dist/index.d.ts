export declare type AsyncFunctionOrPromise<T> = (() => Promise<T>) | Promise<T>;
export declare function usePromiseSubscription<T>(promiseOrFunction: AsyncFunctionOrPromise<T>, defaultValue: T): [T, Error | string | null, boolean];
