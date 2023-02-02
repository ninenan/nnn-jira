import { http } from "@/helpers/http";
import { ISimpleUser, IUser } from "@/typings";
import * as auth from "@helpers/auth";
import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";

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
  const [user, setUser] = useState<IUser | null>(null);

  const login = (user: ISimpleUser) => auth.login(user).then(setUser);
  const register = (user: ISimpleUser) => auth.register(user).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));

  useEffect(() => {
    const init = async () => {
      const res = await initUser();
      setUser(res);
    };

    init();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout }}
      children={children}
    />
  );
};
