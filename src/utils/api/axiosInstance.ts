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

export default axiosInstance;
