import axios, { AxiosResponse } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
console.log({ BASE_URL });

axios.interceptors.request.use(
  (config) => {
    if (!config.url || !config.headers) {
      return config;
    }

    const { origin } = new URL(config.url);
    const allowedOrigins = [BASE_URL];
    const token = localStorage.getItem("token");
    if (allowedOrigins.includes(origin)) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export async function get(path: string): Promise<AxiosResponse<any, any>> {
  return axios.get(`${BASE_URL}/${path}`).catch((error) => {
    throw new Error(`Failed to post! Error: ${error}`);
  });
}

export async function post(
  path: string,
  payload: any
): Promise<AxiosResponse<any, any>> {
  return axios.post(`${BASE_URL}/${path}`, payload).catch((error) => {
    throw new Error(`Failed to post! Error: ${error}`);
  });
}

export function saveToken(token: string) {
  localStorage.setItem("token", token);
}

export function removeToken() {
  localStorage.removeItem("token");
}
