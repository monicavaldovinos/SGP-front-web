import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.100.67:8080/sgp-api",
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;