import axios from "axios";

const BASE_URL =
  "https://yv6zgf4z0d.execute-api.eu-north-1.amazonaws.com/api/v1";

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
