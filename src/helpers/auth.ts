import { STORAGE, API_URL } from "@/constants";
import { IUser, ISimpleUser } from "@/typings";

// 获取 token
export const getToken = () => window.localStorage.getItem(STORAGE.AUTH_TOKEN);

export const handleUserResponse = ({ user }: { user: IUser }): IUser => {
  if (user.token) {
    window.localStorage.setItem(STORAGE.AUTH_TOKEN, user.token);
  }

  return user;
};

// 登录
export const login = async (params: ISimpleUser) => {
  return fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  }).then(async (res) => {
    if (res.ok) {
      return handleUserResponse(await res.json());
    }
    return Promise.reject(params);
  });
};

// 注册
export const register = async (params: ISimpleUser) => {
  return fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  }).then(async (res) => {
    if (res.ok) {
      return handleUserResponse(await res.json());
    }
    return Promise.reject(params);
  });
};

// 退出
export const logout = async () =>
  window.localStorage.removeItem(STORAGE.AUTH_TOKEN);
