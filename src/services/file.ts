import configs from "core/configs";
import axiosInstance from "core/utils/api/axiosInstance";

export const getSignedUrls = async ({
  bucket,
  files,
  folder,
}: {
  bucket: string;
  files?: string[];
  folder?: string;
}) => {
  const res = await axiosInstance.post(
    `${configs.apiEndpoint}/files/get-signed-urls`,
    {
      bucket,
      files,
      folder,
    },
  );
  return res.data?.data;
};
