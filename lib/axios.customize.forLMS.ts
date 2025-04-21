import axios from "axios";
import { getSession, signOut } from "next-auth/react";

const instance = axios.create({
  baseURL: process.env.LMS_URL || "http://localhost:1234",
  headers: {
    "Content-Type": "application/json",
  },
});

//Alter defaults after instance has been created
// Add a request interceptor
instance.interceptors.request.use(
  async function (config) {
    // Do something before request is sent
    const session = await getSession();
    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Nếu lỗi 401 và chưa thử refresh token
    if (error.response?.status === 401) {
      signOut();
    }
  }
);

export default instance;
