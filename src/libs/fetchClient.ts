import axios from "axios";

import { configs } from "@/configs";
import { clientCookies } from "./cookies";

const fetchClient = axios.create({
  baseURL: configs.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

fetchClient.interceptors.request.use((config) => {
  // Get cookie and set to header
  config.headers["Authorization"] = `Bearer ${clientCookies.get("token")}`;
  return config;
});

export { fetchClient };
