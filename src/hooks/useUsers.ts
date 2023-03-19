import useHttp from "@hooks/useHttp";
import type { IUser } from "@/typings";
import { useQuery } from "react-query";

const useUsers = (data?: Partial<IUser>) => {
  const http = useHttp();

  return useQuery<IUser[]>(["users", data], () => http("users", { data }));
};

export default useUsers;
