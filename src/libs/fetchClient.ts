import axios from "axios";

import { configs } from "@/configs";
import { getSession } from "next-auth/react";

const fetchClient = axios.create({
  baseURL: configs.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

fetchClient.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session) {
      config.headers.Authorization = `Bearer ${session.backendToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { fetchClient };
