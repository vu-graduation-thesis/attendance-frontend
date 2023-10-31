import configs from "core/configs/index.js";
import axiosInstance from "core/utils/api/axiosInstance.js";

export const getAttendanceLog = async (lessonId: string) => {
  const response = await axiosInstance.get(
    `${configs.apiEndpoint}/attendance-logs`,
    {
      params: {
        lessonId,
      },
    },
  );
  return response.data?.data;
};
