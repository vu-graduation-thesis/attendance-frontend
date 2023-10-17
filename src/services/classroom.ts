import configs from "core/configs";
import axiosInstance from "core/utils/api/axiosInstance";

export const getClassrooms = async () => {
  const res = await axiosInstance.get(`${configs.apiEndpoint}/v1/classrooms`);
  return res.data?.data;
};

export const updateClassroom = async (data: any) => {
  const res = await axiosInstance.put(
    `${configs.apiEndpoint}/v1/classrooms/${data.id}`,
    data
  );
  return res.data?.data;
}

export const createClassroom = async (data: any) => {
  const res = await axiosInstance.post(
    `${configs.apiEndpoint}/v1/classrooms`,
    data
  );
  return res.data?.data;
}