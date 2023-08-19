import axios from "axios";

const backendURL = "http://127.0.0.1:8000";
const getUser = () => {
  const data = localStorage.getItem("auth");
  return data ? JSON.parse(data) : null;
};

export const publicApi = axios.create({
  baseURL: backendURL,
});

export const authorizedApi = axios.create({
  baseURL: backendURL,
});

authorizedApi.interceptors.request.use(async (config) => {
  const access = getUser().access;
  config.headers["Authorization"] = `JWT ${access}`;
  config.headers["Content-Type"] = "application/json";
  return config;
});

authorizedApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("ERROR: ", error);
    if (error.response && error.response.status === 403) {
      console.log("get new token");
    }
    return Promise.reject(error);
  }
);
