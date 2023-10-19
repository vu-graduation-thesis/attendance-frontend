import axios from "axios";

import configs from "core/configs";

import { getAccessToken } from "../storage";

const axiosInstance = axios.create({
  baseURL: configs.apiEndpoint,
});

axiosInstance.interceptors.request.use(
  function (config: any) {
    const accessToken = getAccessToken();
    if (accessToken && config) {
      config.headers.authorization = `X-Token ${accessToken}`;
    }
    return config;
  },
  function (error: any) {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  function (response: any) {
    return response;
  },
  function (error: any) {
    if (error.response?.status === 401) {
      window.location.replace("/login");
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
