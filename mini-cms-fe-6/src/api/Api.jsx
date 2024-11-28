import axios from "axios";
import { store } from "../store";
import { refreshToken } from "./slices/authSlice";
//import { store } from "../store";
//import { logout, refreshToken } from "./slices/authSlice";

const Api = axios.create({
  baseURL: "http://localhost:5045",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

Api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await store.dispatch(refreshToken()).unwrap();
        return Api(originalRequest);
      } catch (refreshError) {
        window.location.href = "/login";
        //await store.dispatch(logout()).unwrap();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default Api;
