import axios, { AxiosError } from "axios";

export const isProduction = import.meta.env.MODE === "production";
export const API_URL = isProduction
  ? "http://localhost:8080"
  : "http://localhost:8080";

export const createAxiosInstance = () => {
  const axiosInstance = axios.create({
    baseURL: API_URL,
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      return Promise.reject(error); // 에러를 적절히 전파
    },
  );

  return axiosInstance;
};

const axiosInstance = createAxiosInstance();

export default axiosInstance;
