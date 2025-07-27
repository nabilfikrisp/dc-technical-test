import axios from "axios";
import { ENV } from "./env.config";
import useAuthStore from "@/stores/auth.store";

const api = axios.create({
  baseURL: ENV.BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const { jwt } = useAuthStore.getState();

    if (jwt) {
      config.headers.Authorization = `Bearer ${jwt}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
