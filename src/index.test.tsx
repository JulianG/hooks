import React from 'react';

import { usePromiseSubscription, AsyncFunctionOrPromise } from './index'

import { render, cleanup, waitForDomChange } from 'react-testing-library'

describe('usePromiseSubscription tests', async () => {

  afterEach(cleanup)

  function HookTester(props: { asyncFunctionOrPromise: AsyncFunctionOrPromise<any>, initialValue: any }) {
    const { asyncFunctionOrPromise, initialValue } = props
    const [value, error] = usePromiseSubscription(asyncFunctionOrPromise, initialValue, [])
    const errorToString = (error: string | Error) => (error instanceof Error) ? error.message : error.toString()
    return (!error)
      ? value
      : errorToString(error)
  }

  describe('passing an async function', () => {

    it('updates the value when the promise resolves', async () => {

      const { getByText } = render(
        <HookTester
          asyncFunctionOrPromise={() => Promise.resolve('success!')}
          initialValue={'loading...'}
        />
      )

      getByText('loading...')

      await waitForDomChange()

      getByText('success!')

    })

    it('it updates the error with the rejection reason when the promise is rejected', async () => {

      const { getByText } = render(
        <HookTester
          asyncFunctionOrPromise={() => Promise.reject('epic fail!')}
          initialValue={'loading...'}
        />
      )

      getByText('loading...')

      await waitForDomChange()

      getByText('epic fail!')

    })

  })

  describe('passing a promise', () => {

    it('updates the value when the promise resolves', async () => {

      const { getByText } = render(
        <HookTester
          asyncFunctionOrPromise={Promise.resolve('success!')}
          initialValue={'loading...'}
        />
      )

      getByText('loading...')

      await waitForDomChange()

      getByText('success!')

    })

    it('it updates the error with the rejection reason when the promise is rejected', async () => {

      const { getByText } = render(
        <HookTester
          asyncFunctionOrPromise={Promise.reject('epic fail!')}
          initialValue={'loading...'}
        />
      )

      getByText('loading...')

      await waitForDomChange()

      getByText('epic fail!')

    })

  })

})
