import { ITaskType } from "@/typings";
import { useQuery } from "react-query";
import useHttp from "./useHttp";

export const useTaskTypes = () => {
  const http = useHttp();

  return useQuery<ITaskType[]>(["taskTypes"], () => http("taskTypes"));
};
