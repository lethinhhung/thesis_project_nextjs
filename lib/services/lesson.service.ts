import { createAxiosInstance } from "../axios.customize-server";
import { CreateLesson } from "@/interfaces/lesson";

const createLessonAPI = (
  token: string,
  lesson: CreateLesson,
  courseId: string
) => {
  const URL_API = `/api/lesson/create-lesson/${courseId}`;
  return createAxiosInstance(token).post(URL_API, lesson);
};

const getLessonAPI = (token: string, lessonId: string) => {
  const URL_API = `/api/lesson/get-lesson/${lessonId}`;
  return createAxiosInstance(token).get(URL_API);
};

const getAllLessonsAPI = (token: string, courseId: string) => {
  const URL_API = `/api/lesson/get-all-lessons/${courseId}`;
  return createAxiosInstance(token).get(URL_API);
};

const updateLessonContentAPI = (
  token: string,
  lessonId: string,
  content: string
) => {
  const URL_API = `/api/lesson/update-lesson-content/${lessonId}`;
  return createAxiosInstance(token).put(URL_API, { content });
};

export {
  createLessonAPI,
  getLessonAPI,
  getAllLessonsAPI,
  updateLessonContentAPI,
};
