import configs from "core/configs/index.js";
import axiosInstance from "core/utils/api/axiosInstance.js";

export const detectFace = async (lessonId: string, file: string) => {
  console.log("file", file);
  const blob = await fetch(file).then(res => res.blob());
  const formData = new FormData();
  formData.append(`file`, blob, `file-${new Date().getTime()}.png`);

  const response = await axiosInstance.post(
    `${configs.apiEndpoint}/face-recognition/recognize/${lessonId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
};
