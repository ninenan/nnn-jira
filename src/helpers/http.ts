import { API_URL } from "@/constants";
import qs from "qs";
import { logout } from "./auth";
import { message } from "antd";

interface ICustomRequestInit extends RequestInit {
  token?: string;
  data?: object;
}

export const errorHandleMap: Record<string, any> = {
  "401": async () => {
    await logout();
    message.error({
      content: "请先登录",
    });

    window.location.reload();
    return Promise.reject({
      message: "请先登录",
    });
  },
  "400": async (res: Response) => {
    const data = await res.json();
    message.error({
      content: data.message,
    });

    return Promise.reject(data);
  },
};

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

  if (config.method) {
    config.method = config.method?.toUpperCase();
  }

  // 如果是 get 请求
  if (config.method?.toUpperCase() === "GET") {
    url += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  return fetch(`${API_URL}/${url}`, config).then(async (res) => {
    // 错误处理
    if (errorHandleMap[res.status + ""]) {
      return errorHandleMap[res.status + ""](res);
    }

    const data = await res.json();

    if (res.ok) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
};
