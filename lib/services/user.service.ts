import { createAxiosInstance } from "../axios.customize-server";

const getProfileAPI = (token: string) => {
  const URL_API = "/api/user/profile";
  return createAxiosInstance(token).get(URL_API);
};

const updateProfileAPI = (token: string, form: FormData) => {
  const URL_API = "/api/user/update-profile";
  return createAxiosInstance(token).put(URL_API, form);
};

const getAllUsersAPI = (token: string) => {
  const URL_API = "/api/user/all";
  return createAxiosInstance(token).get(URL_API);
};

const deleteUserAPI = (token: string, userId: string) => {
  const URL_API = `/api/user/${userId}`;
  return createAxiosInstance(token).delete(URL_API);
};

const getSystemStatsAPI = (token: string) => {
  const URL_API = "/api/user/stats/system";
  return createAxiosInstance(token).get(URL_API);
};

export {
  getProfileAPI,
  updateProfileAPI,
  getAllUsersAPI,
  deleteUserAPI,
  getSystemStatsAPI,
};
