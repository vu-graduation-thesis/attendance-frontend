import configs from "core/configs";
import axiosInstance from "core/utils/api/axiosInstance";

export const getClasses = async () => {
  const res = await axiosInstance.get(`${configs.apiEndpoint}/v1/classes`);
  return res.data?.data;
};

export const updateClass = async (data: any) => {
  const res = await axiosInstance.put(
    `${configs.apiEndpoint}/v1/classes/${data.id}`,
    data
  );
  return res.data?.data;
}

export const createClass = async (data: any) => {
  const res = await axiosInstance.post(
    `${configs.apiEndpoint}/v1/classes`,
    data
  );
  return res.data?.data;
}