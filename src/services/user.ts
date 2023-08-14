import configs from "core/configs";
import axiosInstance from "core/utils/api/axiosInstance";

export const getUserInfo = async () => {
  const res = await axiosInstance.get(`${configs.apiEndpoint}/v1/users/me`);

  return res.data?.data;
};
