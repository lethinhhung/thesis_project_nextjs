import { createAxiosInstance } from "../axios.customize-server";

const getAllCoursesAndLessons = (token: string) => {
  const URL_API = "/api/data/get-all-courses-and-lessons";
  return createAxiosInstance(token).get(URL_API);
};

export { getAllCoursesAndLessons };
