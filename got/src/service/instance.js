// src/service/instance.js
import axios from "axios";

const baseURL = "http://localhost:3001/api/v1";

const instance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});



export default instance;

