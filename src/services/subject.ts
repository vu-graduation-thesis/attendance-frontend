import configs from "core/configs";
import axiosInstance from "core/utils/api/axiosInstance";

export const getSubjects = async () => {
  const res = await axiosInstance.get(`${configs.apiEndpoint}/v1/subjects`);
  return res.data?.data;
};

export const updateSubject = async (data: any) => {
  const res = await axiosInstance.put(
    `${configs.apiEndpoint}/v1/subjects/${data.id}`,
    data
  );
  return res.data?.data;
}

export const createSubject = async (data: any) => {
  const res = await axiosInstance.post(
    `${configs.apiEndpoint}/v1/subjects`,
    data
  );
  return res.data?.data;
}