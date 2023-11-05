import configs from "core/configs/index.js";
import axiosInstance from "core/utils/api/axiosInstance.js";

export const sendMail = async ({ recipients, mailType }: any) => {
  const res = await axiosInstance.post(`${configs.apiEndpoint}/mails`, {
    recipients,
    mailType,
  });
  return res.data?.data;
};
