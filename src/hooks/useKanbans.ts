import { IKanban } from "@typings/index";
import { useQuery, useMutation } from "react-query";
import type { QueryKey } from "react-query";
import useHttp from "./useHttp";
import { useAddConfig, useDeleteConfig } from "@hooks/useOptimisticOptions";

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

export const useDeleteKanban = (queryKey: QueryKey) => {
  const http = useHttp();

  return useMutation(
    ({ id }: { id: number }) => http(`kanbans/${id}`, { method: "DELETE" }),
    useDeleteConfig(queryKey)
  );
};
