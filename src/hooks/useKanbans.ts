import { IKanban } from "@typings/index";
import { useQuery } from "react-query";
import useHttp from "./useHttp";

export const useKanbans = (params: Partial<IKanban>) => {
  const http = useHttp();

  return useQuery<IKanban[]>(["kanbans", params], () =>
    http("kanbans", { data: params })
  );
};
