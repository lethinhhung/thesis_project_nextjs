import { createAxiosInstance } from "../axios.customize-server";

const getAllCoursesAndLessons = (token: string) => {
  const URL_API = "/api/data/get-limit-courses-and-lessons";
  return createAxiosInstance(token).get(URL_API);
};

const searchAPI = (token: string, params: { query: string }) => {
  const queryString = new URLSearchParams();

  if (params.query) {
    queryString.append("query", params.query);
  }

  const URL_API = `/api/data/search?${queryString.toString()}`;
  return createAxiosInstance(token).get(URL_API);
};

const uploadImageAPI = (token: string, form: FormData) => {
  const URL_API = "/api/data/upload-image";
  return createAxiosInstance(token).post(URL_API, form);
};

export { getAllCoursesAndLessons, searchAPI, uploadImageAPI };
