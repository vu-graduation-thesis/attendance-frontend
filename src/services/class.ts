import configs from "core/configs";
import axiosInstance from "core/utils/api/axiosInstance";

export const getClasses = async (filter?: any) => {
  const res = await axiosInstance.get(`${configs.apiEndpoint}/classes`, {
    params: filter,
  });
  return res.data?.data;
};

export const updateClass = async (data: any) => {
  const res = await axiosInstance.put(
    `${configs.apiEndpoint}/classes/${data.classId}`,
    data,
  );
  return res.data?.data;
};

export const createClass = async (data: any) => {
  const res = await axiosInstance.post(`${configs.apiEndpoint}/classes`, data);
  return res.data?.data;
};
