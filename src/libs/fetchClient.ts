import axios from "axios";

import { configs } from "@/configs";

const fetchClient = axios.create({
  baseURL: configs.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

fetchClient.interceptors.request.use((config) => {
  // Get cookie and set to header
  return config;
});

export { fetchClient };
