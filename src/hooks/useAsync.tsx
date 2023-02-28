import { NoopType } from "@/typings";
import { useState } from "react";

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

const useAsync = <T,>(
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

  const setData = (data: T) =>
    setState({
      data,
      status: "success",
      error: null,
    });

  const setError = (error: Error) =>
    setState({ status: "fail", error, data: null });

  const run = async (promise: Promise<T>, callback?: NoopType) => {
    setState({ ...state, status: "pending" });

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
  };

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
  };
};

export default useAsync;
