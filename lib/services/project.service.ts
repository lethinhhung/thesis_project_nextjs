import { CreateProject } from "@/interfaces/project";
import { createAxiosInstance } from "../axios.customize-server";

const createProjectAPI = (
  token: string,
  courseId: string,
  project: CreateProject
) => {
  const URL_API = `/api/project/create-project/${courseId}`;
  return createAxiosInstance(token).post(URL_API, project);
};

const updateProjectAPI = (
  token: string,
  projectId: string,
  project: CreateProject
) => {
  const URL_API = `/api/project/update-project/${projectId}`;
  return createAxiosInstance(token).patch(URL_API, project);
};

const getCourseProjectsAPI = (token: string, courseId: string) => {
  const URL_API = `/api/project/get-course-projects/${courseId}`;
  return createAxiosInstance(token).get(URL_API);
};

const deleteProjectAPI = (token: string, projectId: string) => {
  const URL_API = `/api/project/delete-project/${projectId}`;
  return createAxiosInstance(token).delete(URL_API);
};

const updateProjectStatusAPI = (
  token: string,
  projectId: string,
  status: string
) => {
  const URL_API = `/api/project/update-project-status/${projectId}`;
  return createAxiosInstance(token).patch(URL_API, { status });
};

export {
  createProjectAPI,
  updateProjectAPI,
  getCourseProjectsAPI,
  deleteProjectAPI,
  updateProjectStatusAPI,
};
