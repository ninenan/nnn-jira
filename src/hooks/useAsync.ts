import { NoopType } from "@/typings";
import { useCallback, useId, useState } from "react";

interface State<T> {
  status: "fail" | "success" | "initial" | "pending";
  error: Error | null;
  data: T | null;
}

const defaultState: State<null> = {
  status: "initial",
  data: null,
  error: null,
};

const defaultConfig = {
  throwError: false,
};

const useAsync = <T>(
  initialState?: State<T>,
  initialConfig?: typeof defaultConfig
) => {
  const config = {
    ...defaultConfig,
    ...initialConfig,
  };
  const [state, setState] = useState<State<T>>({
    ...defaultState,
    ...initialState,
  });
  // useState 直接传入函数，会惰性初始化，因此，要使用 useState 保存函数，不能直接传入函数
  const [retry, setRetry] = useState(() => () => {});

  const setData = useCallback(
    (data: T) =>
      setState({
        data,
        status: "success",
        error: null,
      }),
    []
  );

  const setError = useCallback(
    (error: Error) => setState({ status: "fail", error, data: null }),
    []
  );

  const run = useCallback(
    async (
      promise: Promise<T>,
      callback?: NoopType,
      runConfig?: { retry: () => Promise<T> }
    ) => {
      // 保存上一个请求的函数
      setRetry(() => () => {
        if (runConfig?.retry) {
          run(runConfig?.retry(), undefined, runConfig);
        }
      });
      setState((prev) => ({ ...prev, status: "pending" }));

      return promise
        .then((res) => {
          setData(res);
          if (callback) callback();
          return res;
        })
        .catch((error) => {
          setError(error);
          if (config.throwError) {
            // 这里需要抛出异步错误，否则外部捕获不多错误信息
            return Promise.reject(error);
          }
          return error;
        });
    },
    [config.throwError, setData, setError]
  );

  return {
    isInitial: state.status === "initial",
    isLoading: state.status === "pending",
    isError: state.status === "fail",
    isSuccess: state.status === "success",
    data: state.data,
    error: state.error,
    setData,
    setError,
    run,
    retry,
  };
};

export default useAsync;
