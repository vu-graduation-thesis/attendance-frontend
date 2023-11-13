import configs from "core/configs";
import axiosInstance from "core/utils/api/axiosInstance";

export const getTeachers = async () => {
  const res = await axiosInstance.get(`${configs.apiEndpoint}/teachers`);
  return res.data?.data;
};

export const updateTeacher = async (data: any) => {
  const res = await axiosInstance.put(
    `${configs.apiEndpoint}/teachers/${data.id}`,
    data,
  );
  return res.data?.data;
};

export const createTeacher = async (data: any) => {
  const res = await axiosInstance.post(`${configs.apiEndpoint}/teachers`, data);
  return res.data?.data;
};

export const batchCreateTeacher = async (data: any) => {
  const res = await axiosInstance.post(
    `${configs.apiEndpoint}/teachers/batch`,
    data,
  );
  return res.data?.data;
};
