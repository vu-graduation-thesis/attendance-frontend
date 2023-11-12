import configs from "core/configs";
import axiosInstance from "core/utils/api/axiosInstance";

export const getStudents = async () => {
  const res = await axiosInstance.get(`${configs.apiEndpoint}/students`);
  return res.data?.data;
};

export const updateStudent = async (data: any) => {
  const res = await axiosInstance.put(
    `${configs.apiEndpoint}/students/${data.id}`,
    data,
  );
  return res.data?.data;
};

export const createStudent = async (data: any) => {
  const res = await axiosInstance.post(`${configs.apiEndpoint}/students`, data);
  return res.data?.data;
};

export const getStudentDetail = async (id: string) => {
  const res = await axiosInstance.get(`${configs.apiEndpoint}/students/${id}`);
  return res.data?.data;
};

export const batchCreateStudent = async (data: any) => {
  const res = await axiosInstance.post(
    `${configs.apiEndpoint}/students/batch`,
    data,
  );
  return res.data?.data;
};
