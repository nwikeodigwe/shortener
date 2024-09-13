import axios, { AxiosRequestConfig } from "axios";

export interface FetchResponse<T> {
  count: number;
  next: string | null;
  results: T[];
}

const axiosInstance = axios.create({
  baseURL: import.meta.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": `Bearer ${import.meta.env.REACT_APP_API_KEY}`,
  },
});

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = async (config: AxiosRequestConfig) => {
    const res = await axiosInstance.get<FetchResponse<T>>(
      this.endpoint,
      config
    );
    return res.data;
  };

  get = async (param: number | string) => {
    const res = await axiosInstance.get<T>(this.endpoint + param);
    return res.data;
  };

  post = async (data: T, param: string | null = "") => {
    const res = await axiosInstance.post<T>(this.endpoint + param, data);
    return res.data;
  };
}

export default APIClient;
