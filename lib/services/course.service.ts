import { createAxiosInstance } from "../axios.customize-server";
import { CreateCourse, SearchParams } from "@/interfaces/course";

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

const getOngoingCoursesAPI = (token: string) => {
  const URL_API = "/api/course/get-ongoing-courses";
  return createAxiosInstance(token).get(URL_API);
};

const getCompletedCoursesAPI = (token: string) => {
  const URL_API = "/api/course/get-completed-courses";
  return createAxiosInstance(token).get(URL_API);
};

const deleteCourseAPI = (token: string, courseId: string) => {
  const URL_API = `/api/course/delete-course/${courseId}`;
  return createAxiosInstance(token).delete(URL_API);
};

const updateCourseStatusAPI = (token: string, courseId: string) => {
  const URL_API = `/api/course/update-course-status/${courseId}`;
  return createAxiosInstance(token).patch(URL_API);
};

const searchCoursesAPI = (token: string, params: SearchParams) => {
  const queryString = new URLSearchParams();

  if (params.query) {
    queryString.append("query", params.query);
  }

  if (params.tags && params.tags.length > 0) {
    queryString.append("tags", params.tags.join(","));
  }

  if (params.status !== undefined) {
    queryString.append("status", params.status.toString());
  }

  if (params.page) {
    queryString.append("page", params.page.toString());
  }

  if (params.limit) {
    queryString.append("limit", params.limit.toString());
  }

  const URL_API = `/api/course/search-courses?${queryString.toString()}`;
  return createAxiosInstance(token).get(URL_API);
};

export {
  createCourseAPI,
  getCourseAPI,
  getAllCoursesAPI,
  getOngoingCoursesAPI,
  getCompletedCoursesAPI,
  deleteCourseAPI,
  updateCourseStatusAPI,
  searchCoursesAPI,
};
