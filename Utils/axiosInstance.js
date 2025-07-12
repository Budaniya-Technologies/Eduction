import axios from "axios";
import { MdOutlineKeyboardOptionKey } from "react-icons/md";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    "X-API-KEY": "testapikey123",
    "X-API-SECRET": "testapisecret456"
  },
});

// Add a request interceptorruk
axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  if (!token) {
    return config;
  }
  config = {
    ...config,
    headers: { ...config.headers, Authorization: `Bearer ${token}` },
  };
  return config;
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      localStorage.removeItem("accessToken");
      window.location.href = "/";
    }
    return Promise.reject(err);
  }
);

export { axiosInstance };