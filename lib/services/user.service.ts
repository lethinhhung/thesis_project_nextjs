import axios from "../axios.customize";

const getProfileAPI = () => {
  const URL_API = "/api/user/profile";
  return axios.get(URL_API);
};

export { getProfileAPI };
