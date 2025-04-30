import axios from "axios";

export const createAxiosInstance = (token?: string) => {
  const instance = axios.create({
    baseURL: process.env.BACKEND_URL || "http://localhost:8080",
    withCredentials: true,
  });

  instance.interceptors.request.use(
    async function (config) {
      // Do something before request is sent
      if (!token) {
        return config;
      }

      config.headers.Authorization = `Bearer ${token}`;

      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error

      return error;
    }
  );

  return instance;
};
