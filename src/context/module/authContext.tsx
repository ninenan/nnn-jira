import { http } from "@/helpers/http";
import useAsync from "@/hooks/useAsync";
import { ISimpleUser, IUser } from "@/typings";
import * as auth from "@helpers/auth";
import React, { createContext, PropsWithChildren, useEffect } from "react";
import { DevTools } from "jira-dev-tool";
import { Spin } from "antd";

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

  const login = (user: ISimpleUser) => auth.login(user).then(setUser);
  const register = (user: ISimpleUser) => auth.register(user).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));

  useEffect(() => {
    const init = async () => {
      run(initUser());
    };

    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading || isInitial) {
    return (
      <p
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spin size="large" />
      </p>
    );
  }

  if (isError || error) {
    return (
      <div>
        {error?.message} <DevTools />
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout }}
      children={children}
    />
  );
};
