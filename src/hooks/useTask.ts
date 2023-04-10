import { IProject, ITask } from "@typings/index";
import { useQuery, useMutation } from "react-query";
import type { QueryKey } from "react-query";
import useHttp from "./useHttp";
import {
  useAddConfig,
  useEditConfig,
  useDeleteConfig,
} from "@hooks/useOptimisticOptions";

export const useTasks = (params?: Partial<ITask>) => {
  const http = useHttp();

  return useQuery<ITask[]>(["tasks", params], () =>
    http("tasks", { data: params })
  );
};

export const useAddTask = (queryKey: QueryKey) => {
  const http = useHttp();

  return useMutation(
    (data: Partial<ITask>) =>
      http(`tasks`, {
        data,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useTask = (id?: number) => {
  const http = useHttp();

  return useQuery<IProject>(["task", { id }], () => http(`tasks/${id}`), {
    enabled: !!id,
  });
};

export const useEditTask = (queryKey: QueryKey) => {
  const http = useHttp();

  return useMutation(
    (data: Partial<ITask>) =>
      http(`tasks/${data.id}`, { method: "PATCH", data }),
    useEditConfig(queryKey)
  );
};

export const useDeleteTask = (queryKey: QueryKey) => {
  const http = useHttp();

  return useMutation(
    ({ id }: { id: number }) => http(`tasks/${id}`, { method: "DELETE" }),
    useDeleteConfig(queryKey)
  );
};
