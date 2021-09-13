import axios from "axios";

const baseAPIURL = "http://127.0.0.1:8000/";
const token = localStorage.getItem('access_token');

const api = axios.create({
  baseURL: baseAPIURL,
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": "*",
  },
});

const authApi = axios.create({
  baseURL: baseAPIURL,
  headers: {
    "Content-Type": "application/json",
    'Authorization':`Bearer ${token}`,
    "Accept-Language": "*",
  },
});

export { api, authApi };