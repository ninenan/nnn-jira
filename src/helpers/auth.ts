import { STORAGE, API_URL } from "@/constants";
import { IUser, ISimpleUser } from "@/typings";
import { http } from "./http";

// 获取 token
export const getToken = () => window.localStorage.getItem(STORAGE.AUTH_TOKEN);

export const handleUserResponse = ({ user }: { user: IUser }): IUser => {
  if (user?.token) {
    window.localStorage.setItem(STORAGE.AUTH_TOKEN, user.token);
  }

  return user;
};

// 登录
export const login = async (params: ISimpleUser) => {
  const res = await http("login", { method: "post", data: params });

  return handleUserResponse(res);
};

// 注册
export const register = async (params: ISimpleUser) => {
  const res = await http("register", { method: "post", data: params });

  return handleUserResponse(res);
};

// 退出
export const logout = async () =>
  window.localStorage.removeItem(STORAGE.AUTH_TOKEN);
