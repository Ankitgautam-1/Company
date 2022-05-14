import axios from "axios";

const axiosConfig = axios.create({
  baseURL: "http://localhost:3030/",
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
    Accpet: "application/json",
  },
});

export default axiosConfig;
