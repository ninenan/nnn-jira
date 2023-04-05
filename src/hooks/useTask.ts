import { ITask } from "@typings/index";
import { useQuery } from "react-query";
import useHttp from "./useHttp";

export const useTasks = (params?: Partial<ITask>) => {
  const http = useHttp();

  return useQuery<ITask[]>(["tasks", params], () =>
    http("tasks", { data: params })
  );
};
