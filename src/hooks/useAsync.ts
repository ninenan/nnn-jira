import { useCallback, useReducer, useState } from "react";
import useMountedRef from "./useMountedRef";

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

const useSafeDispatch = <T>(dispatch: (...rest: T[]) => void) => {
  const { mountedRef } = useMountedRef();

  return useCallback(
    (...rest: T[]) => (mountedRef.current ? dispatch(...rest) : void 0),
    [dispatch, mountedRef]
  );
};

const useAsync = <T>(
  initialState?: State<T>,
  initialConfig?: typeof defaultConfig
) => {
  const config = {
    ...defaultConfig,
    ...initialConfig,
  };

  const [state, dispatch] = useReducer(
    (state: State<T>, action: Partial<State<T>>) => {
      console.log({ ...state }, { ...action });
      return { ...state, ...action };
    },
    {
      ...defaultState,
      ...initialState,
    }
  );

  const safeDispatch = useSafeDispatch(dispatch);
  // useState 直接传入函数，会惰性初始化，因此，要使用 useState 保存函数，不能直接传入函数
  const [retry, setRetry] = useState(() => () => {});

  const setData = useCallback(
    (data: T) =>
      safeDispatch({
        data,
        status: "success",
        error: null,
      }),
    [safeDispatch]
  );

  const setError = useCallback(
    (error: Error) => safeDispatch({ status: "fail", error, data: null }),
    [safeDispatch]
  );

  const run = useCallback(
    async (promise: Promise<T>, runConfig?: { retry: () => Promise<T> }) => {
      // 保存上一个请求的函数
      setRetry(() => () => {
        if (runConfig?.retry) {
          run(runConfig?.retry(), runConfig);
        }
      });
      safeDispatch({ status: "pending" });

      return promise
        .then((res) => {
          setData(res);
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
    [config.throwError, setData, setError, safeDispatch]
  );

  // 当依赖于非基本类型的值，基本都会包裹一层 useCallback 或者 useMemo，限制住页面渲染的时候重新创建
  // 当自定义 hook 返回出去函数的时候，基本都是要加上 useCallback（概率很大）
  // 当别的组件依赖于当前这个组件导出的函数时，如果不加上 useCallback，页面的每次渲染都会导致重新创建函数，从而导致无限渲染
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
