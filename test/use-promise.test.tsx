import React from 'react';

import { usePromise } from '../src/index';

import {
  render,
  cleanup,
  waitForDomChange,
  Matcher,
  act,
} from '@testing-library/react';

describe('usePromise tests', () => {
  afterEach(cleanup);

  type Props = {
    promise: (() => Promise<any>) | Promise<any>;
    initialValue: any;
  };

  const errorToString = (error: string | Error) =>
    error instanceof Error ? error.message : error.toString();

  function HookTester({ promise, initialValue }: Props) {
    const [value, error] = usePromise(promise, initialValue);
    return !error ? value : errorToString(error);
  }

  function renderHookTest(promise: Props['promise']) {
    return render(<HookTester promise={promise} initialValue={'loading...'} />);
  }

  async function testAssertions(
    getByText: (text: Matcher) => HTMLElement,
    expected: string
  ) {
    getByText('loading...');
    await waitForDomChange();
    getByText(expected);
  }

  describe('passing an async function', () => {
    it('updates the value when the promise resolves', async () => {
      const { getByText } = renderHookTest(() => Promise.resolve('success!'));
      await testAssertions(getByText, 'success!');
    });

    it('updates the error with the rejection reason when the promise is rejected', async () => {
      const { getByText } = renderHookTest(() => Promise.reject('epic fail!'));
      await testAssertions(getByText, 'epic fail!');
    });

    it('the async function is called only once, even after re-rendering', async () => {
      const asyncFunction = jest.fn(() => Promise.resolve('success!'));

      const { getByText, rerender } = render(
        <HookTester promise={asyncFunction} initialValue={'loading...'} />
      );

      await waitForDomChange();

      getByText('success!');

      rerender(
        <HookTester promise={asyncFunction} initialValue={'loading...'} />
      );

      rerender(
        <HookTester promise={asyncFunction} initialValue={'loading...'} />
      );

      expect(asyncFunction).toHaveBeenCalledTimes(1);

      getByText('success!');
    });

    it('the async function is called only twice, if we re-render with new props once', async () => {
      const asyncFunction = jest.fn(() => Promise.resolve('success!'));

      const { getByText, rerender } = render(
        <HookTester promise={asyncFunction} initialValue={'loading...'} />
      );

      await waitForDomChange();

      getByText('success!');

      await act(async () => {
        rerender(
          <HookTester
            promise={asyncFunction}
            initialValue={'extra loading...'}
          />
        );
      });
      expect(asyncFunction).toHaveBeenCalledTimes(2);

      getByText('success!');
    });
  });

  describe('passing a promise', () => {
    it('updates the value when the promise resolves', async () => {
      const { getByText } = renderHookTest(Promise.resolve('success!'));
      await testAssertions(getByText, 'success!');
    });

    it('it updates the error with the rejection reason when the promise is rejected', async () => {
      const { getByText } = renderHookTest(Promise.reject('epic fail!'));
      await testAssertions(getByText, 'epic fail!');
    });
  });
});
