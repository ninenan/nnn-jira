import { IKanban } from "@typings/index";
import { useQuery, useMutation } from "react-query";
import type { QueryKey } from "react-query";
import useHttp from "./useHttp";
import { useAddConfig } from "@hooks/useOptimisticOptions";

export const useKanbans = (params?: Partial<IKanban>) => {
  const http = useHttp();

  return useQuery<IKanban[]>(["kanbans", params], () =>
    http("kanbans", { data: params })
  );
};

export const useAddKanban = (queryKey: QueryKey) => {
  const http = useHttp();

  return useMutation(
    (data: Partial<IKanban>) =>
      http(`kanbans`, {
        data,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};
