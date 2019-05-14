# Bananahooks

"Collection" of custom React Hooks.

## Requirements:

* React 16.8.0 or higher

## Install

```
npm install bananahooks
```
or
```
yarn add bananahooks
```

## Develop

```
yarn install

yarn test

yarn build

```

### Releases

```
yarn build
npm version [patch|minor|major]
npm publish
```

----

## usePromise

Custom React Hook that properly awaits a promise to resolve.  
It automatically 'unsubscribes' if the component is unmounted.

Here's an example on CodeSandbox:  
[![Edit pkk3xjn00m](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/pkk3xjn00m?fontsize=14)

### Usage

Import the function:

```js
import { usePromise } from 'bananahooks';
```

### Basic usage:
```js
const App = ({ client }) => {

  const [bananas] = usePromise(client.fetchBananas, [])

  return (
    <ul>
    {bananas.map(banana => <li>{banana}<li>)}
    </ul>
  )
}
```
The first render will use the empty array passed as a default value.  
The next render will -probably- have some bananas in the `bananas` array.

**Note that there is no need to `useState` to keep track of `bananas`.**

### Advanced usage:

Handling errors and loading state.
```js
const App = ({ client }) => {

  const [bananas, error, pending] = usePromise(client.fetchBananas, [])

  return (
    <ul>
    {pending && <li>Loading...</li>}
    {!pending && error && <li>Error! {error.toString()}</li>)}
    {!pending && !error && bananas.map(banana => <li>{banana}<li>)}
    </ul>
  )
}
```
On the first render `pending` is true and the "loading" message is rendered.  
The next time the promise will have resolved or rejected.
`error` will be 'truthy' if the promise was rejected, and error message can be displayed.
In most cases the promise will have resolved and the `bananas` array is displayed.


----

This project was bootstrapped with TSDX:

# TSDX Bootstrap

This project was bootstrapped with [TSDX](https://github.com/jaredpalmer/tsdx).

## Local Development

Below is a list of commands you will probably find useful.

### `npm start` or `yarn start`

Runs the project in development/watch mode. Your project will be rebuilt upon changes. TSDX has a special logger for you convenience. Error messages are pretty printed and formatted for compatibility VS Code's Problems tab.

<img src="https://user-images.githubusercontent.com/4060187/52168303-574d3a00-26f6-11e9-9f3b-71dbec9ebfcb.gif" width="600" />

Your library will be rebuilt if you make edits.

### `npm run build` or `yarn build`

Bundles the package to the `dist` folder.
The package is optimized and bundled with Rollup into multiple formats (CommonJS, UMD, and ES Module).

<img src="https://user-images.githubusercontent.com/4060187/52168322-a98e5b00-26f6-11e9-8cf6-222d716b75ef.gif" width="600" />

### `npm test` or `yarn test`

Runs the test watcher (Jest) in an interactive mode.
By default, runs tests related to files changed since the last commit.
