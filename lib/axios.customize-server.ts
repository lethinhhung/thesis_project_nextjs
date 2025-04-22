import axios from "axios";

export const createAxiosInstance = (token: string) => {
  const instance = axios.create({
    baseURL: process.env.BACKEND_URL || "http://localhost:8080",
    withCredentials: true,
  });

  instance.interceptors.request.use(
    async function (config) {
      // Do something before request is sent

      config.headers.Authorization = `Bearer ${token}`;

      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  return instance;
};
