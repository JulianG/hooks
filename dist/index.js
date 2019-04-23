"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
function usePromiseSubscription(promiseOrFunction, defaultValue) {
    var _a = React.useState({
        value: defaultValue,
        error: null,
        isPending: true
    }), state = _a[0], setState = _a[1];
    React.useEffect(function () {
        var promise = typeof promiseOrFunction === "function"
            ? promiseOrFunction()
            : promiseOrFunction;
        var isSubscribed = true;
        promise
            .then(function (value) {
            return isSubscribed ? setState({ value: value, error: null, isPending: false }) : null;
        })
            .catch(function (error) {
            return isSubscribed
                ? setState({ value: defaultValue, error: error, isPending: false })
                : null;
        });
        return function () {
            isSubscribed = false;
        };
    }, [promiseOrFunction, defaultValue]);
    var value = state.value, error = state.error, isPending = state.isPending;
    return [value, error, isPending];
}
exports.usePromiseSubscription = usePromiseSubscription;
//# sourceMappingURL=index.js.map