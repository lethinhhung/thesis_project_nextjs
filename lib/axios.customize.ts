import axios from "axios";

const instance = axios.create({
  baseURL: process.env.BACKEND_URL || "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

//Alter defaults after instance has been created
// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers.Authorization = `Bearer dwadwadadwadw`;
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
    const originalRequest = error.config;
    const ignoredUrls = ["/auth/login"];
    const requestUrl = originalRequest.url;

    // Nếu lỗi 401 và chưa thử refresh token
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !ignoredUrls.some((url) => requestUrl.includes(url))
    ) {
      originalRequest._retry = true;

      try {
        // Gọi API refresh token (cookie được gửi tự động)
        const response = await instance.post("/api/auth/refresh-token");

        if (response.data?.success) {
          // Lưu access token mới

          const { accessToken } = response.data.data;
          // localStorage.setItem("access_token", accessToken);

          // Thêm token mới vào header và thử lại request ban đầu
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          console.log("Retrying request with new access token");
          return axios(originalRequest);
        } else {
          // Nếu refresh token cũng hết hạn, đăng xuất người dùng
          // localStorage.removeItem("access_token");
          // localStorage.removeItem("user");
          // window.location.href = "/login";
          return Promise.reject(error);
        }
      } catch (refreshError) {
        // Nếu refresh token cũng hết hạn, đăng xuất người dùng
        // localStorage.removeItem("access_token");
        // localStorage.removeItem("user");
        // window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    if (error?.response) return error?.response;
    return Promise.reject(error);
  }
);

export default instance;
