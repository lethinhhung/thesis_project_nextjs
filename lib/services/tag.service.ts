import { createAxiosInstance } from "../axios.customize-server";

const createTagAPI = (token: string, title: string) => {
  const URL_API = `/api/tag/create-tag`;
  return createAxiosInstance(token).post(URL_API, { title });
};

const getTagAPI = (token: string, tagId: string) => {
  const URL_API = `/api/tag/get-tag/${tagId}`;
  return createAxiosInstance(token).get(URL_API);
};

const getAllTagsAPI = (token: string) => {
  const URL_API = `/api/tag/get-all-tags`;
  return createAxiosInstance(token).get(URL_API);
};

// const deleteLessonAPI = (token: string, lessonId: string) => {
//   const URL_API = `/api/lesson/delete-lesson/${lessonId}`;
//   return createAxiosInstance(token).delete(URL_API);
// };

export { createTagAPI, getTagAPI, getAllTagsAPI };
