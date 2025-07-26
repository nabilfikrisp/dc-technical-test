import axios from "axios";
import { ENV } from "./env.config";

const api = axios.create({
  baseURL: ENV.BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
