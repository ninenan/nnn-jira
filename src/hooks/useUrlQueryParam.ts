import { cleanObj } from "@/helpers/utils";
import { useMemo } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";

const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams();

  return [
    // 这里返回的是一个对象，不使用 useMemo 的话，每次遇到值都会返回一个新的对象，导致页面重新渲染
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return { ...prev, [key]: searchParams.get(key) || "" };
        }, {} as Record<K, string>),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParams]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      const val = cleanObj({
        // Object.fromEntries 转换为对象
        ...Object.fromEntries(searchParams),
        ...params,
      }) as URLSearchParamsInit;
      return setSearchParams(val);
    },
    // setSearchParams,
  ] as const;
};

export default useUrlQueryParam;
