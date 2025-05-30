import { Message } from "@/interfaces/message";
import axios from "@/lib/axios.customize.forLMS";

const getModelsList = () => {
  const URL_API = "/v1/models";
  return axios.get(URL_API);
};

const chatCompletions = (
  messages: Message[],
  model: string = "default-model"
) => {
  const URL_API = "/v1/chat/completions";
  const payload = {
    model,
    messages: messages,
  };

  return axios.post(URL_API, payload);
};

export { getModelsList, chatCompletions };
