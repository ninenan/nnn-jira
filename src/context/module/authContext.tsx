import React, {
  PropsWithChildren,
  useState,
  useContext,
  createContext,
} from "react";
import * as auth from "@helpers/auth";
import { ISimpleUser, IUser } from "@/typings";

const AuthContext = createContext<
  | {
      user: IUser | null;
      login: (user: ISimpleUser) => Promise<void>;
      register: (user: ISimpleUser) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);

  const login = (user: ISimpleUser) => auth.login(user).then(setUser);
  const register = (user: ISimpleUser) => auth.register(user).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout }}
      children={children}
    />
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth 必须在 AuthProvider 中使用");
  }

  return context;
};
