import axios, { AxiosResponse } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

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
    return Promise.reject(error);
  });
}

export async function post(
  path: string,
  payload: any
): Promise<AxiosResponse<any, any>> {
  return axios.post(`${BASE_URL}/${path}`, payload).catch((error) => {
    return Promise.reject(error);
  });
}

export async function patch(
  path: string,
  payload: any
): Promise<AxiosResponse<any, any>> {
  return axios.patch(`${BASE_URL}/${path}`, payload).catch((error) => {
    return Promise.reject(error);
  });
}

export async function deleteRequest(
  path: string,
  payload?: any
): Promise<AxiosResponse<any, any>> {
  return axios.delete(`${BASE_URL}/${path}`, payload).catch((error) => {
    return Promise.reject(error);
  });
}

export function saveToken(token: string) {
  localStorage.setItem("token", token);
}

export function removeToken() {
  localStorage.removeItem("token");
}
