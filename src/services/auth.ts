import axios from "axios";

import configs from "core/configs";
import axiosInstance from "core/utils/api/axiosInstance";

export const login = async (username: string, password: string) => {
  const res = await axios.post(`${configs.apiEndpoint}/auth/login`, {
    username,
    password,
  });

  return res.data?.data;
};

export const loginWithGoogle = async (idToken: string) => {
  const res = await axios.post(
    `${configs.apiEndpoint}/auth/login-with-google`,
    {
      idToken,
    },
  );
  return res.data?.data;
};

export const verifyToken = async (token: string) => {
  const res = await axiosInstance.get(
    `${configs.apiEndpoint}/auth/verify-token`,
    {
      params: {
        token,
      },
    },
  );

  return res.data?.data;
};

export const getUserInfo = async () => {
  const res = await axiosInstance.get(`${configs.apiEndpoint}/auth/me`);
  return res.data?.data;
};
