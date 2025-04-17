import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { NotOkResponseError } from "~/core/errors";

/** This function attempts to resolve a promise given by a function received as a parameter as soon as the component on which it is called is rendered as well as to handle the resolution states through reactive objects. This promise can be resolved again if the parameters are modified or if required manually by the `doReload` function returned.*/
export function usePromiseData<T, S>(
  /** The promise to be resolved.*/
  callback: (props?: S) => Promise<T>,
  /**The props to be passed to the callback. */
  props?: S,
) {
  const [promiseState, setPromiseState] = useState<PromiseState<T>>({
    isLoading: true,
  });

  const navigate = useNavigate();

  async function resolvePromise() {
    setPromiseState({ ...promiseState, isLoading: true, error: null });

    try {
      setPromiseState({
        isLoading: false,
        data: await callback(props),
        error: null,
      });
    } catch (error) {
      if (error instanceof NotOkResponseError && error.name !== "AbortError") {
        console.error(error);
        setPromiseState({
          data: null,
          isLoading: false,
          error: error,
        });

        if (error.status === 401 || error.status === 403) {
          navigate("/auth/login");
        }
      }
    }
  }

  // Watch for changes and trigger the resolution of the promise.
  useEffect(() => {
    resolvePromise().then();
  }, [callback.name?.toString(), JSON.stringify(props)]);

  return {
    ...promiseState,
    doReload: resolvePromise,
  };
}

export type PromiseState<T> = {
  data?: T | null;
  error?: Error | null;
  isLoading: boolean;
};
