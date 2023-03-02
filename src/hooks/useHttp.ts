import useAuth from "@hooks/useAuth";
import { http } from "@helpers/http";

const useHttp = () => {
  const { user } = useAuth();

  return ([url, config]: Parameters<typeof http>) =>
    http(url, { ...config, token: user?.token });
};

export default useHttp;
