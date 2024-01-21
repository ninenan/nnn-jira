import { http } from "@/helpers/http";
import useAsync from "@/hooks/useAsync";
import { ISimpleUser, IUser } from "@typings/index";
import * as auth from "@helpers/auth";
import React, { createContext, PropsWithChildren, useEffect } from "react";
import FullScreenErrorCallback from "@components/Base/FullScreenErrorFallback";
import FullScreenLoading from "@components/Base/FullScreenLoading";
import { useQueryClient } from "react-query";

export const AuthContext = createContext<
  | {
      user: IUser | null;
      login: (user: ISimpleUser) => Promise<void>;
      register: (user: ISimpleUser) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";

export const initUser = async () => {
  let user: IUser | null = null;
  const token = auth.getToken();

  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }

  return user;
};

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const {
    data: user,
    error,
    isLoading,
    isInitial,
    isError,
    run,
    setData: setUser,
  } = useAsync<IUser | null>();
  const queryClient = useQueryClient();

  const login = (user: ISimpleUser) => auth.login(user).then(setUser);
  const register = (user: ISimpleUser) => auth.register(user).then(setUser);
  const logout = () =>
    auth.logout().then(() => {
      setUser(null);
      queryClient.clear(); // 将通过 use-query 获取的数据全部删除
    });

  useEffect(() => {
    const init = async () => {
      run(initUser());
    };

    init();
  }, [run]);
  // eslint-disable-next-line react-hooks/exhaustive-deps

  if (isLoading || isInitial) {
    return <FullScreenLoading />;
  }

  if (isError || error) {
    return <FullScreenErrorCallback error={error} />;
  }

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout }}
      children={children}
    />
  );
};
