import useAuth from "@hooks/useAuth";
import { http } from "@helpers/http";
import { useCallback } from "react";

const useHttp = () => {
  const { user } = useAuth();

  return useCallback(
    (...[url, config]: Parameters<typeof http>) =>
      http(url, { ...config, token: user?.token }),
    [user?.token]
  );
};

export default useHttp;
