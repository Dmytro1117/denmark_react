import axios from "axios";

const denmarkAPI = axios.create({
  // baseURL: "http://localhost:8080/api",
  baseURL: import.meta.env.VITE_BASE_BACKEND_URL,
  // baseURL = "https://denmark-api-node-js.onrender.com/api";
});

export const setAuthHeader = (token) => {
  denmarkAPI.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const cleanAuthHeader = () => {
  denmarkAPI.defaults.headers.common.Authorization = "";
};

export default denmarkAPI;
