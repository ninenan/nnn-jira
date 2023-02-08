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

const useAsync = <T,>(initialState?: State<T>) => {
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

  const run = async (promise: Promise<T>) => {
    setState({ ...state, status: "pending" });

    return promise
      .then((res) => {
        setData(res);
        return res;
      })
      .catch((error) => {
        setError(error);
        return error;
      });
  };

  return {
    isInitial: state.status === "initial",
    isLoading: state.status === "pending",
    isError: state.status === "fail",
    isSuccess: state.status === "success",
    data: state.data,
    setData,
    setError,
    run,
  };
};

export default useAsync;
