import { API_URL } from "@/constants";
import qs from "qs";
import { logout } from "./auth";

interface ICustomRequestInit extends RequestInit {
  token?: string;
  data?: object;
}

export const http = async (
  url: string,
  { data, token, headers, ...customConfig }: ICustomRequestInit = {}
) => {
  const config: ICustomRequestInit = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };

  // 如果是 get 请求
  if (config.method?.toUpperCase() === "GET") {
    url += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  return fetch(`${API_URL}/${url}`, config).then(async (res) => {
    // 未授权
    if (res.status === 401) {
      await logout();
      window.location.reload();
      return Promise.reject({
        message: "清先登录",
      });
    }

    const data = await res.json();

    if (res.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
};
