import * as React from "react";
export declare type AsyncFunctionOrPromise<T> = (() => Promise<T>) | Promise<T>;
export declare function usePromiseSubscription<T>(promiseOrFunction: AsyncFunctionOrPromise<T>, defaultValue: T, deps: React.DependencyList): any[];
