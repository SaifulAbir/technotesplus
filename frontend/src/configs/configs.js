import axios from "axios";

const baseAPIURL = "http://127.0.0.1:8000/";

const api = axios.create({
  baseURL: baseAPIURL,
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": "*",
  },
});

export { api };