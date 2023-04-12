import { IEpic } from "@/typings/modules/epic";
import { QueryKey, useMutation, useQuery } from "react-query";
import useHttp from "./useHttp";
import { useAddConfig, useDeleteConfig } from "./useOptimisticOptions";

export const useEpics = (data?: Partial<IEpic>) => {
  const http = useHttp();

  return useQuery<IEpic[]>(["epics", data], () => http("epics", { data }));
};

export const useAddEpic = (queryKey: QueryKey) => {
  const http = useHttp();

  return useMutation(
    (data: Partial<IEpic>) => http("epics", { data, method: "POST" }),
    useAddConfig(queryKey)
  );
};

export const useDeleteEpic = (queryKey: QueryKey) => {
  const http = useHttp();

  return useMutation(
    ({ id }: { id: number }) => http(`epics/${id}`, { method: "DELETE" }),
    useDeleteConfig(queryKey)
  );
};
