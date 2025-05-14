import { CreateTest } from "@/interfaces/test";
import { createAxiosInstance } from "../axios.customize-server";

const createTestAPI = (token: string, courseId: string, test: CreateTest) => {
  const URL_API = `/api/test/create-test/${courseId}`;
  return createAxiosInstance(token).post(URL_API, test);
};

const updateTestAPI = (token: string, testId: string, test: CreateTest) => {
  const URL_API = `/api/test/update-test/${testId}`;
  return createAxiosInstance(token).patch(URL_API, test);
};

const deleteTestAPI = (token: string, testId: string) => {
  const URL_API = `/api/test/delete-test/${testId}`;
  return createAxiosInstance(token).delete(URL_API);
};

const getCourseTestsAPI = (token: string, courseId: string) => {
  const URL_API = `/api/test/get-course-tests/${courseId}`;
  return createAxiosInstance(token).get(URL_API);
};

const updateTestScoreAPI = (token: string, testId: string, score: number) => {
  const URL_API = `/api/test/update-test-score/${testId}`;
  return createAxiosInstance(token).patch(URL_API, { score });
};

export {
  createTestAPI,
  updateTestAPI,
  deleteTestAPI,
  getCourseTestsAPI,
  updateTestScoreAPI,
};
