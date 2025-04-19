import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: "https://fakestoreapi.com",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000
});

export default api; 