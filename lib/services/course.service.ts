import { createAxiosInstance } from "../axios.customize-server";
import { CreateCourse } from "@/interfaces/course";

const createCourseAPI = (token: string, course: CreateCourse) => {
  const URL_API = "/api/course/create-course";
  return createAxiosInstance(token).post(URL_API, course);
};

const getCourseAPI = (token: string, courseId: string) => {
  const URL_API = `/api/course/get-course/${courseId}`;
  return createAxiosInstance(token).get(URL_API);
};

const getAllCoursesAPI = (token: string) => {
  const URL_API = "/api/course/get-all-courses";
  return createAxiosInstance(token).get(URL_API);
};

export { createCourseAPI, getCourseAPI, getAllCoursesAPI };
