import configs from "core/configs";
import axiosInstance from "core/utils/api/axiosInstance";

export const getAdmins = async () => {
  const res = await axiosInstance.get(`${configs.apiEndpoint}/admins`);
  return res.data?.data;
};

export const updateAdmin = async (data: any) => {
  const res = await axiosInstance.put(
    `${configs.apiEndpoint}/admins/${data.id}`,
    data,
  );
  return res.data?.data;
};

export const createAdmin = async (data: any) => {
  const res = await axiosInstance.post(`${configs.apiEndpoint}/admins`, data);
  return res.data?.data;
};
