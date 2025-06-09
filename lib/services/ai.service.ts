// import { Message } from "@/interfaces/message";
// import axios from "@/lib/axios.customize.forLMS";

// const getModelsList = () => {
//   const URL_API = "/v1/models";
//   return axios.get(URL_API);
// };

// const chatCompletions = (
//   messages: Message[],
//   model: string = "default-model"
// ) => {
//   const URL_API = "/v1/chat/completions";
//   const payload = {
//     model,
//     messages: messages,
//   };

//   return axios.post(URL_API, payload);
// };

// export { getModelsList, chatCompletions };

import { ChatMessage } from "@/interfaces/message";
import { createAxiosInstance } from "../axios.customize-server";

const questionAPI = (token: string, question: string) => {
  const URL_API = "/api/chat/question";
  return createAxiosInstance(token).post(URL_API, { question });
};

const createChatCompletionAPI = (
  token: string,
  messages: ChatMessage[],
  isUseKnowledge: boolean = false,
  model?: string,
  courseId?: string,
  _id?: string
) => {
  const URL_API = "/api/chat/completions";
  return createAxiosInstance(token).post(URL_API, {
    messages,
    isUseKnowledge,
    model,
    courseId,
    _id,
  });
};

const getChatCompletionAPI = (token: string, _id: string) => {
  const URL_API = `/api/chat/get-completions?_id=${_id}`;
  return createAxiosInstance(token).get(URL_API);
};

const getAllChatsAPI = (token: string) => {
  const URL_API = "/api/chat/get-all";
  return createAxiosInstance(token).get(URL_API);
};

export {
  questionAPI,
  createChatCompletionAPI,
  getChatCompletionAPI,
  getAllChatsAPI,
};
