import { createAxiosInstance } from "../axios.customize-server";

const getProfileAPI = (token: string) => {
  const URL_API = "/api/user/profile";
  return createAxiosInstance(token).get(URL_API);
};

export { getProfileAPI };
