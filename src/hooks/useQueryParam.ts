import { cleanObj, subset } from "@/helpers/utils";
import { useMemo, useState } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";

const useSetUrlSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (params: Record<string, unknown>) => {
    const o = cleanObj({
      ...Object.fromEntries(searchParams),
      ...params,
    }) as URLSearchParamsInit;

    return setSearchParams(o);
  };
};

const useUrlQueryParam = <T extends string>(keys: T[]) => {
  const [searchParams] = useSearchParams();
  const setSearchParams = useSetUrlSearchParams();
  const [stateKeys] = useState(keys);

  return [
    useMemo(
      () => subset(Object.fromEntries(searchParams), stateKeys),
      [searchParams, stateKeys]
    ),
    (params: Partial<{ [key in T]: unknown }>) => setSearchParams(params),
  ] as const;
};

export default useUrlQueryParam;
