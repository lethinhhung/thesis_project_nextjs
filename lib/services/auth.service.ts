import { createAxiosInstance } from "../axios.customize-server";

const registerAPI = (username: string, email: string, password: string) => {
  const URL_API = "/api/auth/register";
  return createAxiosInstance().post(URL_API, { username, email, password });
};

const loginAPI = (username: string, password: string) => {
  const URL_API = "/api/auth/login";
  return createAxiosInstance().post(URL_API, { username, password });
};

const logoutAPI = () => {
  const URL_API = "/api/auth/logout";
  return createAxiosInstance().post(URL_API, {}, { withCredentials: true });
};

const refreshTokenAPI = async (token: string) => {
  return createAxiosInstance().post("/auth/refresh-token", { token });
};

export { registerAPI, loginAPI, logoutAPI, refreshTokenAPI };
