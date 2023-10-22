import configs from "core/configs";
import axiosInstance from "core/utils/api/axiosInstance";

export const getLessons = async () => {
  const res = await axiosInstance.get(`${configs.apiEndpoint}/lessons`);
  return res.data?.data;
};

export const updateLesson = async (data: any) => {
  const res = await axiosInstance.put(
    `${configs.apiEndpoint}/lessons/${data.id}`,
    data,
  );
  return res.data?.data;
};

export const createLesson = async (data: any) => {
  const res = await axiosInstance.post(`${configs.apiEndpoint}/lessons`, data);
  return res.data?.data;
};
