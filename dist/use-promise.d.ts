export declare function usePromise<T>(promiseOrFunction: (() => Promise<T>) | Promise<T>, defaultValue: T): [T, Error | string | null, boolean];
