import axios from "../axios.customize";

const getProfileAPI = () => {
  const URL_API = "/api/users/profile";
  return axios.get(URL_API);
};

export { getProfileAPI };
