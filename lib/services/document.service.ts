import { createAxiosInstance } from "../axios.customize-server";

const createDocumentAPI = (token: string, form: FormData) => {
  const URL_API = `/api/document/create-document`;
  return createAxiosInstance(token).post(URL_API, form);
};

const getAllDocumentsAPI = (token: string) => {
  const URL_API = `/api/document/get-all-documents`;
  return createAxiosInstance(token).get(URL_API);
};

export { createDocumentAPI, getAllDocumentsAPI };
