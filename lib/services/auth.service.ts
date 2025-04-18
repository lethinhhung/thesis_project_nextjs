import axios from "../axios.customize";

const registerAPI = (username: string, password: string, email: string) => {
  const URL_API = "/api/auth/register";
  return axios.post(URL_API, { username, password, email });
};

const loginAPI = (username: string, password: string) => {
  const URL_API = "/api/auth/login";
  return axios.post(URL_API, { username, password });
};

const logoutAPI = () => {
  const URL_API = "/api/auth/logout";
  return axios.post(URL_API, {}, { withCredentials: true });
};

const refreshTokenAPI = async (token: string) => {
  return axios.post("/auth/refresh-token", { token });
};

export { registerAPI, loginAPI, logoutAPI, refreshTokenAPI };
