import { useAuthStore } from "@/stores/useAuthStore";
import axios, { AxiosHeaders } from "axios";
import { Mutex } from "async-mutex";

const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URl,
});

request.interceptors.request.use(async (config) => {
  // Authorization
  const token = useAuthStore.getState().token;
  if (token) {
    (config.headers as AxiosHeaders).set("Authorization", `Bearer ${token}`);
  }
  return config;
});

const mutex = new Mutex();
request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;

    if (status === 401) {
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();
        try {
          const { token, refreshToken } = { token: "ab", refreshToken: "abc" };
          if (token) {
            useAuthStore.setState({ token, refreshToken });
            // retry the initial query
            await request(config);
          } else {
            useAuthStore.setState({ token: null, refreshToken: null });
          }
        } finally {
          release();
        }
      } else {
        await mutex.waitForUnlock();
        await request(config);
      }
    }
  }
);

export { request };
