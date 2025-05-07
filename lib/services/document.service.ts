import { createAxiosInstance } from "../axios.customize-server";

const createDocumentAPI = (token: string, form: FormData) => {
  const URL_API = `/api/document/create-document`;
  return createAxiosInstance(token).post(URL_API, form);
};

const getAllDocumentsAPI = (token: string) => {
  const URL_API = `/api/document/get-all-documents`;
  return createAxiosInstance(token).get(URL_API);
};

const downloadDocumentAPI = (token: string, documentId: string) => {
  const URL_API = `/api/document/download/${documentId}`;
  return createAxiosInstance(token).get(URL_API, {
    responseType: "arraybuffer",
    headers: {
      Accept:
        "application/pdf,application/msword,application/vnd.openxmlformats-officedocument.*,application/vnd.ms-excel",
    },
  });
};

const deleteDocumentAPI = (token: string, documentId: string) => {
  const URL_API = `/api/document/delete/${documentId}`;
  return createAxiosInstance(token).delete(URL_API);
};

export {
  createDocumentAPI,
  getAllDocumentsAPI,
  downloadDocumentAPI,
  deleteDocumentAPI,
};
