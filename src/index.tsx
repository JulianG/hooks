import * as React from "react";

export type AsyncFunctionOrPromise<T> = (() => Promise<T>) | Promise<T>;

export function usePromiseSubscription<T>(
  promiseOrFunction: AsyncFunctionOrPromise<T>,
  defaultValue: T,
  deps: React.DependencyList
) {
  const [state, setState] = React.useState({
    value: defaultValue,
    error: null,
    isPending: true
  });

  React.useEffect(() => {
    const promise =
      typeof promiseOrFunction === "function"
        ? promiseOrFunction()
        : promiseOrFunction;

    let isSubscribed = true;
    promise
      .then(value =>
        isSubscribed ? setState({ value, error: null, isPending: false }) : null
      )
      .catch(error =>
        isSubscribed
          ? setState({ value: defaultValue, error: error, isPending: false })
          : null
      );

    return () => {
      isSubscribed = false;
    };
  }, deps);

  const { value, error, isPending } = state;
  return [value, error, isPending];
}
