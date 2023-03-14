import { http } from "@/helpers/http";
import useAsync from "@/hooks/useAsync";
import { ISimpleUser, IUser } from "@/typings";
import * as auth from "@helpers/auth";
import React, { createContext, PropsWithChildren, useEffect } from "react";
import FullScreenErrorCallback from "@components/Base/FullScreenErrorFallback";
import FullScreenLoading from "@components/Base/FullScreenLoading";
import { useDispatch } from "react-redux";
import { bootstrap } from "@/store/modules/auth";

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
  const { error, isLoading, isInitial, isError, run } =
    useAsync<IUser | null>();

  const dispatch: any = useDispatch();

  useEffect(() => {
    const init = async () => {
      run(dispatch(bootstrap()));
    };

    init();
  }, [dispatch, run]);

  if (isLoading || isInitial) {
    return <FullScreenLoading />;
  }

  if (isError || error) {
    return <FullScreenErrorCallback error={error} />;
  }

  return <div>{children}</div>;
};
