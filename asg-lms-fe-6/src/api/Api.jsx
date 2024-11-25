import axios from "axios";
import { refreshToken } from "./slices/authSlice";

const Api = axios.create({
  baseURL: "http://localhost:5238",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

Api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      try {
        console.log(1);
        await refreshToken();
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default Api;
